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
  deleteUserRole
};
