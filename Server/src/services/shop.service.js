const { NotFoundError } = require("../core/error.response");
const { findShop, createOrUpdateShopDetail } = require("../models/repositories/user.repo");

class ShopService {
  static getShopDetails = async ({ _id }) => {
    const foundShop = await findShop({ _id });
    if (!foundShop) {
      throw new NotFoundError("Error: No shop exist");
    }
    return {
      code: 200,
      metadata: foundShop,
    };
  };

  static updateShopDetails = async ({ _id }, data) => {
    const Shop = await createOrUpdateShopDetail({ _id, data });
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
