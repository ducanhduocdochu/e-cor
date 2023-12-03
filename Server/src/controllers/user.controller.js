const UserService = require("../services/user.service");
const { CREATED, OK } = require("../core/success.response");

class UserController {
  getProfile = async (req, res, next) => {
    new OK({
      message: 'Get profile successfully!',
      metadata: await UserService.getProfile(req.params)
  }).send(res)
  };
  getSecurityInfo = async (req, res, next) => {
    new OK({
      message: 'Get security information successfully!',
      metadata: await UserService.getSecurityInfo(req.decodeUser)
  }).send(res)
  };
  updateProfile = async (req, res, next) => {
    new OK({
      message: 'Update profile successfully!',
      metadata: await UserService.updateProfile(req.decodeUser, req.body)
  }).send(res)
  };

  registerRole = async (req, res, next) => {
    new OK({
      message: 'Register role successfully!',
      metadata: await UserService.registerRole(req.decodeUser, req.body)
  }).send(res)
  };
}

module.exports = new UserController();
