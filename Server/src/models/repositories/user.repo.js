const registerRoleDraftModel = require("../register_role_draft.model");
const ShopModel = require("../shop_info.model");
const userModel = require("../user.model");
const userInfoModel = require("../user_info.model");
const userRoleModel = require("../user_role.model");


const findUserById = async ({ _id }) => {
  return await userModel.findOne({
    _id,
  });
};

const findUserByEmail = async ({ email }) => {
  return await userModel.findOne({
    email,
  });
};

const findUserInfoByUserId = async ({ _id }) => {
  return await userInfoModel.findOne({
    _id,
  });
};


const createUser = async ({ username, email, password }) => {
  return await userModel.create({
    username,
    email,
    password,
  });
};

const findUserRoleByUserId = async ({ _id }) => {
  return await userRoleModel.findOne({
    _id,
  });
};

const createUserRole = async ({ _id }) => {
    return await userRoleModel.create({
      _id,
    });
  };

const updateRole = async ({_id}) => {
  return await userRoleModel.updateOne({_id}, {is_shop: true})
}

const createOrUpdateUser = async ({_id, email, password, verify, username, type}) => {
  return await userModel.findOneAndUpdate(
    {_id},
    {_id, email, password, verify, username, type}, 
    { upsert: true, new: true },
  );
}

const createUserInfo = async ({ _id }) => {
  return await userInfoModel.create({
    _id,
  });
};

const createOrUpdateUserInfo = async ({_id, data}) => {
  return await userInfoModel.findOneAndUpdate(
    {_id},
    data, 
    { upsert: true, new: true },
  );
}

const deleteUser = async ({ _id }) => {
  return userModel.deleteOne({ _id });
};

const deleteUserInfo = async ({ _id }) => {
  return userInfoModel.deleteOne({ _id });
};

const deleteUserRole = async ({ _id }) => {
  return userRoleModel.deleteOne({ _id });
};

const getListUser = async ({limit, sortField, sortOrder}) => {
  return await userModel
      .find()
      .limit(limit)
      .sort({ [sortField]: sortOrder }); 
};

const getRegisterRoleDraftById = async ({_id}) => {
  return await registerRoleDraftModel
      .findOne({_id})
};

const createRegisterRoleDraft = async ({_id, type, data}) => {
  return await registerRoleDraftModel.create({
    _id: _id,
    type,
    data
})};

const getListRegisterRoleDraft = async ({limit, sortField, sortOrder}) => {
  return await registerRoleDraftModel
      .find()
      .limit(limit)
      .sort({ [sortField]: sortOrder }); 
};

const deleteRegisterRoleDraftById = async ({ _id }) => {
  return await registerRoleDraftModel.deleteOne({ _id });
};

const createShop = async ({ _id, data }) => {
  const dataObject = Object.fromEntries(data);
  console.log(data)
  return await ShopModel.create({
    _id,
    ...dataObject
  });
};

const findShop = async ({ _id }) => {
  return await ShopModel.findOne({_id: _id})
};

const createOrUpdateShopDetail = async ({_id, data}) => {
  return await ShopModel.findOneAndUpdate(
    {_id},
    data, 
    { upsert: true, new: true },
  );
}



module.exports = {
  findUserById,
  findUserByEmail,
  findUserRoleByUserId,
  findUserInfoByUserId,
  createUser,
  createUserRole,
  createOrUpdateUser,
  createUserInfo,
  createOrUpdateUserInfo,
  deleteUser,
  getListUser,
  deleteUserInfo,
  deleteUserRole,
  createRegisterRoleDraft,
  getListRegisterRoleDraft,
  getRegisterRoleDraftById,
  createShop,
  deleteRegisterRoleDraftById,
  findShop,
  createOrUpdateShopDetail,
  updateRole
};
