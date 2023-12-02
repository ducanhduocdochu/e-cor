const express = require('express');
const asyncHandler = require('../../helper/asyncHandler');
const accessController = require('../../controllers/access.controller');
const { authentication } = require('../../auth/authUtils');

const router = express.Router();

// Lấy thông tin danh mục
// router.get('/delivery/:order_id', asyncHandler(shopController.getShopDetails));

router.use(authentication);
// router.use(admin);

// Create thông tin danh mục
// router.post('/delivery/:shop_id', asyncHandler(shopController.updateShopDetails));

// Cập nhật thông tin danh mục
// router.patch('/delivery/:shop_id', asyncHandler(shopController.updateShopDetails));

// Xóa thông tin danh mục
// router.delete('/delivery/:shop_id', asyncHandler(shopController.updateShopDetails));

module.exports = router;
