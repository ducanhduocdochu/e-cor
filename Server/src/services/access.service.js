const bcrypt = require("bcrypt");
const crypto = require("crypto");
const JWT = require("jsonwebtoken");
const { BadRequestError, AuthFailureError } = require("../core/error.response");
const {
  getInfoData,
  padWithFs,
  convertToObjectIdMongodb,
  sendMail,
} = require("../utils");
const { createTokenPair, generateOTPToken, verifyOTPToken, verifyJWT } = require("../auth/authUtils");
const {
  createUser,
  findUserByEmail,
  createUserRole,
  findUserRoleByUserId,
  createUserInfo,
  createOrUpdateUser,
  createOrUpdateUserInfo,
} = require("../models/repositories/user.repo");
const {
  createKeyToken,
  deleteKeyByUserId,
  updateKeyById,
  findTokenByUserId,
  updateKeyTokenByUserId,
  createOrUpdateKeyToken,
} = require("../models/repositories/keytoken.repo");
const { createApiKey } = require("../auth/checkAuth");
const {
  findApiKeyByUserId,
  updateApiKeyByUserId,
  deleteApiKeyByUserId,
  createNewApiKey,
  createOrUpdateApiKey,
} = require("../models/repositories/apikey.repo");
const tokenVerifyModel = require("../models/token_verify.model");

class AccessService {
  static register = async ({ username, email, password }) => {
    const existedUser = await findUserByEmail({ email });

    if (existedUser) {
      throw new BadRequestError("Error: User already registered");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await createUser({
      username,
      email,
      password: passwordHash,
    });

    const newUserRole = await createUserRole({
      user_id: newUser._id,
    });

    const newUserInfo = await createUserInfo({
      user_id: newUser._id,
    });

    if (!newUser || !newUserRole || !newUserInfo) {
      throw new BadRequestError("Error: User already registered");
    }

    return {
      code: "201",
      metadata: {
        user: getInfoData({
          filter: ["_id", "name", "email"],
          object: newUser,
        }),
      },
    };
  };

  static login = async ({ email, password }) => {
    const foundUser = await findUserByEmail({ email });
    if (!foundUser) throw new BadRequestError("Error: User not registered");
    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
      throw new BadRequestError("Error: Authentication error");
    }

    const public_key = crypto.randomBytes(64).toString("hex");
    const private_key = crypto.randomBytes(64).toString("hex");

    const { _id } = foundUser;
    const tokens = await createTokenPair(
      { _id, email },
      public_key,
      private_key
    );

    const foundUserRole = await findUserRoleByUserId({
      user_id: foundUser._id,
    });

    const apikey = await createApiKey({
      _id,
      email,
      permissions: [
        foundUserRole.is_user ? "user" : "",
        foundUserRole.is_shop ? "shop" : "",
        foundUserRole.is_admin ? "admin" : "",
        foundUserRole.is_delivery_person ? "delivery_person" : "",
        foundUserRole.is_supplier ? "supplier" : "",
      ],
    });

    const _key_token = await findTokenByUserId({ user_id: _id });
    const _api_key = await findApiKeyByUserId({ user_id: _id });
    var key_token;
    var api_key;
    if (_key_token) {
      key_token = await updateKeyTokenByUserId({
        user_id: foundUser._id,
        public_key,
        private_key,
        refresh_token: tokens.refresh_token,
      });
    } else {
      key_token = await createKeyToken({
        user_id: foundUser._id,
        public_key,
        private_key,
        refresh_token: tokens.refresh_token,
      });
    }

    if (_api_key) {
      api_key = await updateApiKeyByUserId({
        user_id: foundUser._id,
        apikey,
      });
    } else {
      api_key = await createNewApiKey({
        user_id: foundUser._id,
        api_key: apikey,
      });
    }

    if (!key_token || !api_key) {
      throw new BadRequestError("Error: Token error");
    }

    return {
      code: 201,
      metadata: {
        user: getInfoData({
          filter: ["_id", "name", "email"],
          object: foundUser,
        }),
        tokens,
        apikey,
      },
    };
  };

  static logout = async (key_token) => {
    return (
      (await deleteKeyByUserId({ user_id: key_token.user_id })) &&
      (await deleteApiKeyByUserId({ user_id: key_token.user_id }))
    );
  };

  static refresh_token = async (decodeUser, key_token) => {
    const { _id, email } = decodeUser;
    const foundUser = await findUserByEmail({ email });
    if (!foundUser) throw new AuthFailureError("User not registered");
    console.log(key_token);

    const tokens = await createTokenPair(
      { _id, email },
      key_token.public_key,
      key_token.private_key
    );

    if (!tokens) {
      throw new BadRequestError("Error: Token error");
    }

    const isSuccess = await updateKeyTokenByUserId({
      user_id: key_token.user_id,
      public_key: key_token.public_key,
      private_key: key_token.public_key,
      refresh_token: tokens.refresh_token,
    });
    if (!isSuccess) {
      throw new BadRequestError("Error: Token error");
    }

    return {
      user: { _id, email },
      tokens,
    };
  };

  static loginGoogle = async ({ profile }) => {
    const foundUser = await findUserByEmail({
      email: `__${profile.emails[0].value}`,
    });
    if (foundUser) {
      const { _id, email } = foundUser;
      const newUserInfo = await createOrUpdateUserInfo({
        _id: _id,
        data: {image: profile._json.picture}
      });

      if(!newUserInfo){
        throw new BadRequestError("Error: Authentication error");
      }

      const public_key = crypto.randomBytes(64).toString("hex");
      const private_key = crypto.randomBytes(64).toString("hex");

      const tokens = await createTokenPair(
        { _id, email },
        public_key,
        private_key
      );

      const foundUserRole = await findUserRoleByUserId({
        user_id: _id,
      });

      const apikey = await createApiKey({
        _id,
        email,
        permissions: [
          foundUserRole.is_user ? "user" : "",
          foundUserRole.is_shop ? "shop" : "",
          foundUserRole.is_admin ? "admin" : "",
          foundUserRole.is_delivery_person ? "delivery_person" : "",
          foundUserRole.is_supplier ? "supplier" : "",
        ],
      });

      const key_token_ = await createOrUpdateKeyToken({
        user_id: _id,
        public_key,
        private_key,
        refresh_token: tokens.refresh_token,
      });
  
      const api_key_ = await createOrUpdateApiKey({
        user_id: _id,
        api_key: apikey,
      });

      if (!key_token_ || !api_key_) {
        throw new BadRequestError("Error: Token error");
      }

      return {
        code: 201,
        metadata: {
          user: getInfoData({
            filter: ["_id", "name", "email"],
            object:  foundUser,
          }),
          tokens,
          apikey,
        },
      };
    }

    // Chưa đăng nhập bao giờ
    const newUser = await createOrUpdateUser({
      _id: convertToObjectIdMongodb(padWithFs(profile.id)),
      email: `__${profile.emails[0].value}`,
      username: profile.displayName,
      password: "123456789",
      verify: profile.emails[0].verified,
      type: "google",
    });

    const newUserRole = await createUserRole({
      user_id: newUser._id,
    });

    const newUserInfo = await createOrUpdateUserInfo({
      _id: newUser._id,
      data: {image: profile._json.picture}
    });

    if (!newUser || !newUserRole || !newUserInfo) {
      throw new BadRequestError("Error: Authentication error");
    }

    const public_key = crypto.randomBytes(64).toString("hex");
    const private_key = crypto.randomBytes(64).toString("hex");

    const tokens = await createTokenPair(
      { _id: newUser._id, email: newUser.email },
      public_key,
      private_key
    );

    const foundUserRole = await findUserRoleByUserId({
      user_id: newUser._id,
    });

    const apikey = await createApiKey({
      _id: newUser._id,
      email: newUser.email,
      permissions: [
        foundUserRole.is_user ? "user" : "",
        foundUserRole.is_shop ? "shop" : "",
        foundUserRole.is_admin ? "admin" : "",
        foundUserRole.is_delivery_person ? "delivery_person" : "",
        foundUserRole.is_supplier ? "supplier" : "",
      ],
    });

    const key_token_ = await createOrUpdateKeyToken({
      user_id: newUser._id,
      public_key,
      private_key,
      refresh_token: tokens.refresh_token,
    });

    const api_key_ = await createOrUpdateApiKey({
      user_id: newUser._id,
      api_key: apikey,
    });

    if (!key_token_ || !api_key_) {
      throw new BadRequestError("Error: Token error");
    }

    return {
      code: 201,
      metadata: {
        user: getInfoData({
          filter: ["_id", "name", "email"],
          object:  newUser,
        }),
        tokens,
        apikey,
      },
    };
  };

  static requestVerify = async ({email}) => {
    const { otp, token } = generateOTPToken();

    const tokenVerify = await tokenVerifyModel.create({token, email})
    
    const isSend = await sendMail({email, otp})

    if (!isSend || !tokenVerify){
      throw new BadRequestError("Error: Send email fail");
    }
    return {
      code: 201,
      metadata: isSend,
    };
  }
  static confirmToken = async({email, confirmOtp}) => {
    const tokenVerify = await tokenVerifyModel.findOne({email})
    const isConfirm = await verifyOTPToken(tokenVerify.token, confirmOtp);
    if(!isConfirm){
      throw new AuthFailureError("Error: Token is incorrect");
    }
    const confirmToken = await JWT.sign({email}, process.env.SECRETKEY_OTP, {
      expiresIn: "2 days",
    });
    return {
      code: 201,
      metadata: confirmToken,
    }; 
  }

  static changePassword = async({email, password, new_password, confirm_token}) =>{
    const decode = await verifyJWT(confirm_token, process.env.SECRETKEY_OTP)
    if(decode.email != email){  
      throw new BadRequestError("Error: Authentication error");
    }
    const foundUser = await findUserByEmail({email})
    if(!foundUser){
      throw new BadRequestError("Error: User does not register");
    }
    
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      throw new BadRequestError("Error: Authentication error");
    }
    const passwordHash = await bcrypt.hash(new_password, 10);
    const updateUser = await createOrUpdateUser({_id: foundUser._id, email: foundUser.email, password: passwordHash, verify: foundUser.verify, username: foundUser.username, type: foundUser.type})

    if (!updateUser) {
      throw new BadRequestError("Error: User does not update");
    }

    return updateUser
  }
}

module.exports = AccessService;
