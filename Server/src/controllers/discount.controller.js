const DiscountService = require("../services/discount.service");
const { CREATED, OK } = require("../core/success.response");

class DiscountController {
  createDiscount = async (req, res, next) => {
    new CREATED({
      message: "Create disocunt successfully",
      metadata: await DiscountService.createDiscount(req.body),
    }).send(res);
  };

  updateDiscount = async (req, res, next) => {
    new CREATED({
      message: "Update discount list successfully",
      metadata: await DiscountService.updateDiscount(req.params, req.body),
    }).send(res);
  };

  deleteDiscount = async (req, res, next) => {
    new OK({
      message: "Delete discount successfully",
      metadata: await DiscountService.deleteDiscount(req.params),
    }).send(res);
  };

  getDiscountByUser = async (req, res, next) => {
    new OK({
      message: "Get list discount successfully",
      metadata: await DiscountService.getDiscountByUser(),
    }).send(res);
  };

  getDiscountById = async (req, res, next) => {
    new OK({
      message: "Get discount successfully",
      metadata: await DiscountService.getDiscountById(req.params),
    }).send(res);
  };

  getDiscountByCode = async (req, res, next) => {
    new CREATED({
      message: "Get discount successfully",
      metadata: await DiscountService.getDiscountByCode(req.params),
    }).send(res);
  };

  getAllDiscountForShop = async (req, res, next) => {
    new CREATED({
      message: "Get list discount successfully",
      metadata: await DiscountService.getAllDiscountForShop(req.params),
    }).send(res);
  };

  getDiscount = async (req, res, next) => {
    new CREATED({
      message: "Get discount successfully",
      metadata: await DiscountService.getDiscount(req.params),
    }).send(res);
  };
}

module.exports = new DiscountController();
