const express = require("express");
const asyncHandler = require("../../helper/asyncHandler");
const DiscountController = require("../../controllers/discount.controller");
const { authentication } = require("../../auth/authUtils");
const { apiKey, permission } = require("../../auth/checkAuth");

const router = express.Router();

/**
 * Thêm một discount
 * @header user_id
 * @header access_token
 * @header api_key
 * @body data
 */
router.post(
  "/",
  apiKey,
  authentication,
  permission["shop"],
  asyncHandler(DiscountController.createDiscount)
);

/**
 * Cập nhật một discount
 * @header user_id
 * @header access_token
 * @header api_key
 * @body data
 * @params discount_id
 */
router.patch(
  "/:discount_id",
  apiKey,
  authentication,
  permission["shop"],
  asyncHandler(DiscountController.updateDiscount)
);

/**
 * Xóa một discount
 * @header user_id
 * @header access_token
 * @header api_key
 * @params discount_id
 */
router.delete(
  "/:discount_id",
  apiKey,
  authentication,
  permission["shop"],
  asyncHandler(DiscountController.deleteDiscount)
);

/**
 * Lấy tất cả discount
 * @header user_id
 * @header access_token
 * @header api_key
 */
router.get("/user", asyncHandler(DiscountController.getDiscountByUser));

/**
 * Lấy một discount bằng id
 * @header user_id
 * @header access_token
 * @header api_key
 */
router.get(
  "/user/:discount_id",
  asyncHandler(DiscountController.getDiscountById)
);

/**
 * Lấy một discount bằng code
 * @header user_id
 * @header access_token
 * @header api_key
 */
router.get("/user/:code", asyncHandler(DiscountController.getDiscountByCode));

/**
 * Lấy toàn bộ discount của shop
 * @header user_id
 * @header access_token
 * @header api_key
 */
router.get(
  "/shop",
  apiKey,
  authentication,
  permission["shop"],
  asyncHandler(DiscountController.getAllDiscountForShop)
);

/**
 * Lấy discount của shop
 * @header user_id
 * @header access_token
 * @header api_key
 */
router.get(
  "/shop/:discount_id",
  apiKey,
  authentication,
  permission["shop"],
  asyncHandler(DiscountController.getDiscount)
);

module.exports = router;
