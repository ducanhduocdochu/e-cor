const express = require('express');
const asyncHandler = require('../../helper/asyncHandler');
const shopController = require('../../controllers/shop.controller');
const { authentication } = require('../../auth/authUtils');
const { permission, apiKey } = require('../../auth/checkAuth');

const router = express.Router();

/**
 * Lấy thông tin chi tiết của shop
 * @params shop_id
 */
router.get('/:shop_id', asyncHandler(shopController.getShopDetails));

/**
 * Sửa thông tin chi tiết của shop
 * @header user-id
 * @header access-token
 * @header api-key
 * @params shop_id
 */
router.put('/:shop_id',authentication, apiKey, permission(["shop"]), asyncHandler(shopController.updateShopDetails));

module.exports = router;
