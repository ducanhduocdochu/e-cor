const express = require("express");
const asyncHandler = require("../../helper/asyncHandler");
const adminController = require("../../controllers/admin.controller");
const { apiKey, permission } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");

const router = express.Router();

// Xác thực phân quyền
router.use(apiKey);
router.use(authentication);
router.use(permission(["admin"]));

/**
 * Yêu cầu đổi mật khẩu hoặc quên mật khẩu hoặc xác nhận email
 * @header user-id
 * @header access-token
 * @header api-key
 * @params type
 */
router.put('/accept-role', asyncHandler(adminController.acceptRole));

/**
 * Yêu cầu đổi mật khẩu hoặc quên mật khẩu hoặc xác nhận email
 * @header user-id
 * @header access-token
 * @header api-key
 * @params type
 */
router.delete('/user/:user_id', asyncHandler(adminController.deleteUser));

/**
 * Yêu cầu đổi mật khẩu hoặc quên mật khẩu hoặc xác nhận email
 * @header user-id
 * @header access-token
 * @header api-key
 * @params type
 */
router.get('/user/:user_id',asyncHandler(adminController.getUser));

/**
 * Yêu cầu đổi mật khẩu hoặc quên mật khẩu hoặc xác nhận email
 * @header user-id
 * @header access-token
 * @header api-key
 * @params type
 */
router.get('/user', asyncHandler(adminController.getListUser));


module.exports = router;
