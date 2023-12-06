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
  getListRegisterRoleDraft,
  getRegisterRoleDraftById,
  createShop,
  deleteRegisterRoleDraftById
} = require("../models/repositories/user.repo");

class AdminService {
  static acceptRole = async ({_id}) => {
    const requestRole = await getRegisterRoleDraftById({_id})
    if(!requestRole){
      throw new NotFoundError("Error: no request role exist")
    }
    if (requestRole.type == "shop"){
      const newShop = await createShop({user_id: requestRole.user_id, data: requestRole.data})
      const deletedRequestRole = await deleteRegisterRoleDraftById({_id})
      if (!newShop || !deletedRequestRole){
        throw new NotFoundError("Error: create failure shop")
      }
      return {
        code: "200",
        metadata: newShop,
      };
    }
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
  static getRequestRole = async ({limit, sortField, sortOrder}) => {
    const listDraft = await getListRegisterRoleDraft({
      limit: limit ? limit : 10,
      sortField: sortField ? sortField : "createdAt",
      sortOrder: sortOrder ? sortOrder : "asc",
    })
    return {
      code: "200",
      metadata: {
        listDraft,
      },
    };
  };
}

module.exports = AdminService;
