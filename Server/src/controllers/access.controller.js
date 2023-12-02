const AccessService = require("../services/access.service");
const { CREATED, OK, SuccessResponse } = require("../core/success.response");

class AccessController {
  register = async (req, res, next) => {
    new CREATED({
      message: "Registered OK!",
      metadata: await AccessService.register(req.body),
    }).send(res);
  };

  login = async (req, res, next) => {
    new OK({
      message: "Login success",
      metadata: await AccessService.login(req.body),
    }).send(res);
  };

  logout = async (req, res, next) => {
    new OK({
      message: "Log out success",
      metadata: await AccessService.logout(req.key_token),
    }).send(res);
  };

  refresh_token = async (req, res, next) => {
    new CREATED({
      message: "Refresh Token success",
      metadata: await AccessService.refresh_token(
        req.decodeUser,
        req.key_token
      ),
    }).send(res);
  };

  changeDirectGoogle = (req, res, next) => {
    res.redirect(`/v1/api/login-success/${req.user?._id}`)
    return res.status(200).json(req.user);
  };

  loginGoogle = (req, res, next) => {
    new CREATED({
      message: "Login Google success",
      metadata: req.user
  }).send(res);
  };

  requestVerify = async (req, res, next) => {
    new CREATED({
      message: "Request verify",
      metadata:  await AccessService.requestVerify(
        req.body,
      ),
  }).send(res);
  }
  confirmToken = async (req, res, next) => {
    new OK({
      message: "Confirm success",
      metadata:  await AccessService.confirmToken(
        req.body,
      ),
  }).send(res);
  }
  changePassword = async (req, res, next) =>{
    new OK({
      message: "Change password success",
      metadata:  await AccessService.changePassword(
        req.body,
      ),
  }).send(res);
  }
}

module.exports = new AccessController();
