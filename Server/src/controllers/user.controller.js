const UserService = require("../services/user.service");
const { CREATED, OK } = require("../core/success.response");

class UserController {
  getProfile = async (req, res, next) => {
    new OK({
      message: 'Get profile success!',
      metadata: await UserService.getProfile(req.body)
  }).send(res)
  };
}

module.exports = new UserController();
