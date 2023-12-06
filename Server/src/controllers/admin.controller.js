const AdminService = require("../services/admin.service");
const { CREATED, OK, SuccessResponse } = require("../core/success.response");

class AdminController {
  acceptRole = async (req, res, next) => {
    new OK({
      message: "Accept role successfully",
      metadata: await AdminService.acceptRole(req.params),
    }).send(res);
  };

  deleteUser = async (req, res, next) => {
    new OK({
      message: "Delete user successfully",
      metadata: await AdminService.deleteUser(req.params),
    }).send(res);
  };

  getListUser = async (req, res, next) => {
    new OK({
      message: "Get list user successfully",
      metadata: await AdminService.getListUser(req.query),
    }).send(res);
  };

  getUser = async (req, res, next) => {
    new OK({
      message: "Get user successfully",
      metadata: await AdminService.getUser(req.params),
    }).send(res);
  };

  getRequestRole = async (req, res, next) => {
    new OK({
      message: "Get request role successfully",
      metadata: await AdminService.getRequestRole(req.query),
    }).send(res);
  }
}

module.exports = new AdminController();
