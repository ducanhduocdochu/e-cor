const express = require('express');
const asyncHandler = require('../../helper/asyncHandler');
const accessController = require('../../controllers/access.controller');
const { authentication } = require('../../auth/authUtils');

const router = express.Router();

// Lấy thông tin chi tiết đơn gian
// router.get('/delivery/:order_id', asyncHandler(shopController.getShopDetails));

// Lấy thông tin chi tiết danh sách đơn cần giao
// router.get('/delivery', asyncHandler(shopController.getShopDetails));

router.use(authentication);
// router.use(shop);

// Cập nhật thông tin vận chuyển
// router.patch('/delivery/:shop_id', asyncHandler(shopController.updateShopDetails));

module.exports = router;
