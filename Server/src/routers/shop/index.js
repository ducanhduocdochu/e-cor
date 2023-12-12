const express = require('express');
const asyncHandler = require('../../helper/asyncHandler');
const shopController = require('../../controllers/shop.controller');
const { authentication } = require('../../auth/authUtils');
const { permission, apiKey } = require('../../auth/checkAuth');

const router = express.Router();

/**
 * Lấy thông tin chi tiết của shop
 * @params _id
 */
router.get('/:_id', asyncHandler(shopController.getShopDetails));

/**
 * Sửa thông tin chi tiết của shop
 * @header user-id
 * @header access-token
 * @header api-key
 * @params _id
 */
router.put('/:_id',authentication, apiKey, permission(["shop"]), asyncHandler(shopController.updateShopDetails));

module.exports = router;
