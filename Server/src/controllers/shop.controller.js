const ShopService = require("../services/shop.service");
const { CREATED, OK } = require("../core/success.response");

class shopController {
  getShopDetails = async (req, res, next) => {
    new OK({
      message: "Get shop details successfully",
      metadata: await ShopService.getShopDetails(req.params),
    }).send(res);
  };

  updateShopDetails = async (req, res, next) => {
    new CREATED({
      message: "Get shop successfully",
      metadata: await ShopService.updateShopDetails(req.params, req.body),
    }).send(res);
  };
}

module.exports = new shopController();
