const JWT = require("jsonwebtoken");
const asyncHandler = require("../helper/asyncHandler");
const { AuthFailureError, NotFoundError } = require("../core/error.response");
const { findTokenByUserId } = require("../models/repositories/keytoken.repo");
const { convertToObjectIdMongodb } = require("../utils");

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
  REFRESHTOKEN: "x-rtoken-id",
};

const createTokenPair = async (payload, public_key, private_key) => {
  try {
    const access_token = await JWT.sign(payload, public_key, {
      expiresIn: "2 days",
    });
    const refresh_token = await JWT.sign(payload, private_key, {
      expiresIn: "7 days",
    });
    return { access_token, refresh_token };
  } catch (error) {
    console.log(error);
  }
};

const authentication = asyncHandler(async (req, res, next) => {
  const user_id = req.headers[HEADER.CLIENT_ID];
  if (!user_id) throw new AuthFailureError("Invalid request");
  const key_token = await findTokenByUserId({
    user_id: convertToObjectIdMongodb(user_id),
  });
  if (!key_token) throw new NotFoundError("Not found keyStore");

  if (req.headers[HEADER.REFRESHTOKEN]) {
    try {
      const refresh_token = req.headers[HEADER.REFRESHTOKEN];
      const decodeUser = await verifyJWT(refresh_token, key_token.private_key);
      if (user_id !== decodeUser._id.toString())
        throw new AuthFailureError("Invalid userId");
      if (key_token.refresh_token !== refresh_token) {
        throw new AuthFailureError("User not registered");
      }
      req.key_token = key_token;
      req.decodeUser = decodeUser;
      return next();
    } catch (err) {
      throw err;
    }
  }

  const access_token = req.headers[HEADER.AUTHORIZATION];
  if (!access_token) throw new AuthFailureError("Invalid request");

  try {
    const decodeUser = await verifyJWT(access_token, key_token.public_key);
    if (user_id != decodeUser._id.toString())
      throw new AuthFailureError("Invalid userId");
    req.key_token = key_token;
    req.decodeUser = decodeUser;
    return next();
  } catch (err) {
    throw err;
  }
});

const verifyJWT = async (token, keySecret) => {
  return await JWT.verify(token, keySecret);
};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateOTPToken() {
  const otp = generateOTP();
  const expiresInMinutes = 5;

  const payload = {
    otp,
    exp: Math.floor(Date.now() / 1000) + expiresInMinutes * 60,
  };

  const token = JWT.sign(payload, process.env.SECRETKEY_OTP);

  return { otp, token };
}

function verifyOTPToken(token, otp) {
  try {
    const decoded = JWT.verify(token, process.env.SECRETKEY_OTP);

    if (decoded.otp === otp && decoded.exp > Math.floor(Date.now() / 1000)) {
      return true; 
    } else {
      return false;
    }
  } catch (error) {
    return false; 
  }
}

module.exports = { createTokenPair, authentication, verifyJWT, generateOTPToken, verifyOTPToken };
