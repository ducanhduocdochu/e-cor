const { NotFoundError } = require("../core/error.response");
const { findShop, createOrUpdateShopDetail } = require("../models/repositories/user.repo");

class ShopService {
  static getShopDetails = async ({ shop_id }) => {
    const foundShop = await findShop({ shop_id });
    if (!foundShop) {
      throw new NotFoundError("Error: No shop exist");
    }
    return {
      code: 200,
      metadata: foundShop,
    };
  };

  static updateShopDetails = async ({ shop_id }, data) => {
    const Shop = await createOrUpdateShopDetail({ shop_id, data });
    if (!Shop) {
      throw new NotFoundError("Error: Update fail");
    }
    return {
      code: 201,
      metadata: Shop,
    };
  };
}

module.exports = ShopService;
