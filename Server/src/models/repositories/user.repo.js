const userModel = require("../user.model");
const userInfoModel = require("../user_info.model");
const user_roleModel = require("../user_role.model");


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

const createUser = async ({ username, email, password }) => {
  return await userModel.create({
    username,
    email,
    password,
  });
};

const findUserRoleByUserId = async ({ user_id }) => {
  return await user_roleModel.findOne({
    user_id,
  });
};

const createUserRole = async ({ user_id }) => {
    return await user_roleModel.create({
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

const createOrUpdateUserInfo = async ({_id, data}) => {
  return await userInfoModel.findOneAndUpdate(
    {_id},
    data, 
    { upsert: true, new: true },
  );
}

module.exports = {
  findUserById,
  createUser,
  findUserByEmail,
  findUserRoleByUserId,
  createUserRole,
  createOrUpdateUser,
  createUserInfo,
  createOrUpdateUserInfo
};
