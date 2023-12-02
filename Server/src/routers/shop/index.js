const express = require('express');
const asyncHandler = require('../../helper/asyncHandler');
const accessController = require('../../controllers/access.controller');
const { authentication } = require('../../auth/authUtils');

const router = express.Router();

// Lấy thông tin chi tiết của shop
router.get('/shop/:shop_id', asyncHandler(shopController.getShopDetails));

router.use(authentication);

// router.use(shop);

// Sửa thông tin chi tiết của shop
router.patch('/shop/:shop_id', asyncHandler(shopController.updateShopDetails));

module.exports = router;
