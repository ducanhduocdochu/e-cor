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

const findUserInfoByUserId = async ({ user_id }) => {
  return await userInfoModel.findOne({
    user_id,
  });
};


const createUser = async ({ username, email, password }) => {
  return await userModel.create({
    username,
    email,
    password,
  });
};

const findUserRoleByUserId = async ({ user_id }) => {
  return await userRoleModel.findOne({
    user_id,
  });
};

const createUserRole = async ({ user_id }) => {
    return await userRoleModel.create({
      user_id,
    });
  };

const createOrUpdateUser = async ({_id, email, password, verify, username, type}) => {
  return await userModel.findOneAndUpdate(
    {_id},
    {_id, email, password, verify, username, type}, 
    { upsert: true, new: true },
  );
}

const createUserInfo = async ({ user_id }) => {
  return await userInfoModel.create({
    user_id,
  });
};

const createOrUpdateUserInfo = async ({user_id, data}) => {
  return await userInfoModel.findOneAndUpdate(
    {user_id},
    data, 
    { upsert: true, new: true },
  );
}

const deleteUser = async ({ _id }) => {
  return userModel.deleteOne({ _id });
};

const deleteUserInfo = async ({ user_id }) => {
  return userInfoModel.deleteOne({ user_id });
};

const deleteUserRole = async ({ user_id }) => {
  return userRoleModel.deleteOne({ user_id });
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
    user_id: _id,
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

const createShop = async ({ user_id, data }) => {
  return await ShopModel.create({
    user_id,
    ...dataObject
  });
};

const findShop = async ({ shop_id }) => {
  return await ShopModel.findOne({_id: shop_id})
};

const createOrUpdateShopDetail = async ({shop_id, data}) => {
  return await ShopModel.findOneAndUpdate(
    {_id: shop_id},
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
  createOrUpdateShopDetail
};
