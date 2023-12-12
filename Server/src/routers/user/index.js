const express = require('express');
const asyncHandler = require('../../helper/asyncHandler');
const userController = require('../../controllers/user.controller');
const { authentication } = require('../../auth/authUtils');

const router = express.Router();

/**
 * Lấy thông tin người dùng
 */
router.get('/profile/:_id', asyncHandler(userController.getProfile));

/**
 * Lấy thông tin người dùng
 * @header user_id
 * @header access_token
 * @header api_key
 */
router.get('/security-info',authentication, asyncHandler(userController.getSecurityInfo));

/**
 * Thay đổi thông tin/:user_id
 * @header user_id
 * @header access_token
 * @header api_key
 */
router.put('/profile',authentication, asyncHandler(userController.updateProfile));

/**
 * Đăng ký role
 * @header user_id
 * @header access_token
 * @header api_key
 * @body type: enum = ["shop", "delivery-person", "supplier"]
 * @body attribute of type
 */
router.post('/register-role', authentication, asyncHandler(userController.registerRole)); // => register_role_draft

module.exports = router;
