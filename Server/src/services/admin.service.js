const { NotFoundError } = require("../core/error.response");
const { deleteApiKeyByUserId } = require("../models/repositories/apikey.repo");
const { deleteKeyByUserId } = require("../models/repositories/keytoken.repo");
const {
  deleteUser,
  getListUser,
  findUserById,
  findUserInfoByUserId,
  findUserRoleByUserId,
  deleteUserInfo,
  deleteUserRole,
} = require("../models/repositories/user.repo");

class AdminService {
  static acceptRole = async () => {
    return {
      code: "200",
      metadata: "user + shop",
    };
  };
  static deleteUser = async ({ user_id }) => {
    const user = await deleteUser({ _id: user_id });
    const user_info = await deleteUserInfo({ user_id });
    const user_role = await deleteUserRole({ user_id });
    const api_key = await deleteApiKeyByUserId({ user_id });
    const key_token = await deleteKeyByUserId({ user_id });
    return {
      code: "200",
      metadata: {
        user,
        user_info,
        user_role,
        api_key,
        key_token,
      },
    };
  };
  static getListUser = async ({ limit, sortField, sortOrder }) => {
    const listUser = await getListUser({
      limit: limit ? limit : 10,
      sortField: sortField ? sortField : "createdAt",
      sortOrder: sortOrder ? sortOrder : "asc",
    });
    if (!listUser) {
      throw new NotFoundError("Error: No users exist");
    }
    return {
      code: "200",
      metadata: listUser,
    };
  };
  static getUser = async ({ user_id }) => {
    const user = await findUserById({ _id: user_id });
    const user_info = await findUserInfoByUserId({ user_id });
    const user_role = await findUserRoleByUserId({ user_id });
    if (!user || !user_info || !user_role) {
      throw new NotFoundError("Error: No user exist");
    }
    return {
      code: "200",
      metadata: {
        user,
        user_info,
        user_role,
      },
    };
  };
}

module.exports = AdminService;
