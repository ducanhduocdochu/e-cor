const express = require('express');
const asyncHandler = require('../../helper/asyncHandler');
const userController = require('../../controllers/user.controller');
const { authentication } = require('../../auth/authUtils');

const router = express.Router();

/**
 * Lấy thông tin người dùng
 * @params user_id
 */
router.get('/profile/:user_id', asyncHandler(userController.getProfile));

// Xác thực
router.use(authentication);

/**
 * Lấy thông tin người dùng
 * @header user_id
 * @header access_token
 * @role admin, user
 */
// router.get('/profile', asyncHandler(userController.GetSecurityInfo));

/**
 * Thay đổi thông tin
 * @header user_id
 * @header access_token
 * @role admin, user
 */
// router.put('/profile/phone', asyncHandler(userController.register));

// Thông tin khác
// router.put('/profile', asyncHandler(accessController.register));

// Đăng ký shop
// router.post('/register-shop', asyncHandler(shopController.registerShop));

// Đăng ký delivery person
// router.post('/register-delivery-person', asyncHandler(shopController.registerShop));

// Đăng ký supplier
// router.post('/register-supplier', asyncHandler(shopController.registerShop));

// router.use(admin);

// Chấp nhận shop
// router.put('/accept-shop', asyncHandler(accessController.register));

// Chấp nhận người vận chuyển
// router.put('/accept-delivery-person', asyncHandler(accessController.register));

// Chấp nhận nhà cung cấp
// router.put('/accept-supplier', asyncHandler(accessController.register));

// Xóa người dùng
// router.delete('', asyncHandler(accessController.register));

module.exports = router;
