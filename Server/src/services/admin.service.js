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
  deleteRegisterRoleDraftById,
  updateRole
} = require("../models/repositories/user.repo");

class AdminService {
  static acceptRole = async ({_id}) => {
    const requestRole = await getRegisterRoleDraftById({_id})
    if(!requestRole){
      throw new NotFoundError("Error: no request role exist")
    }
    if (requestRole.type == "shop"){
      const newShop = await createShop({_id, data: requestRole.data})
      const roleUser = await updateRole({_id}, {isShop: true})
      const deletedRequestRole = await deleteRegisterRoleDraftById({_id})

      if (!newShop || !deletedRequestRole || !roleUser){
        throw new NotFoundError("Error: create failure shop")
      }
      return {
        code: "200",
        metadata: newShop,
      };
    }
  };
  static deleteUser = async ({ _id }) => {
    const user = await deleteUser({ _id });
    const user_info = await deleteUserInfo({ _id });
    const user_role = await deleteUserRole({ _id });
    const api_key = await deleteApiKeyByUserId({ _id });
    const key_token = await deleteKeyByUserId({ _id });
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
  static getUser = async ({ _id }) => {
    const user = await findUserById({ _id: _id });
    const user_info = await findUserInfoByUserId({ _id });
    const user_role = await findUserRoleByUserId({ _id });
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
