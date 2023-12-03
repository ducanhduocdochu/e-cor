const { BadRequestError } = require("../core/error.response");
const { findUserInfoByUserId, findUserById, createOrUpdateUserInfo } = require("../models/repositories/user.repo");
const { convertToObjectIdMongodb } = require("../utils");

class UserService {
  static getProfile = async ({ user_id }) => {
    const user_info = await findUserInfoByUserId({user_id: convertToObjectIdMongodb(user_id)})
    if (!user_info){
        throw new BadRequestError("Error: user_id does not exist ");
    }
    return {
        code: 200,
        metadata: user_info,
      }; 
  }

  static getSecurityInfo = async ({ _id }) => {
    const user = await findUserById({_id})
    if (!user){
        throw new BadRequestError("Error: user_id does not exist ");
    }
    return {
        code: 200,
        metadata: user,
      }; 
  }

  static updateProfile = async ({_id}, data) => {
    const user = await createOrUpdateUserInfo({user_id: _id, data})
    if (!user){
        throw new BadRequestError("Error: user does not exist or update fail ");
    }
    return {
        code: 201,
        metadata: user,
      }; 
  }

  static registerRole = async ({_id}, data) => {
    return {
        code: 201,
        metadata: 1,
      }; 
  }
}

module.exports = UserService;
