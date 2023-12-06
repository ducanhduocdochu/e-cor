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
 * Xác nhận quyền user
 * @header user-id
 * @header access-token
 * @header api-key
 * @params type
 */
router.put('/accept-role/:_id', asyncHandler(adminController.acceptRole));

/**
 * Xóa người dùng
 * @header user-id
 * @header access-token
 * @header api-key
 * @params type
 */
router.delete('/user/:user_id', asyncHandler(adminController.deleteUser));

/**
 * Lấy thông tin chi tiết người dùng
 * @header user-id
 * @header access-token
 * @header api-key
 * @params type
 */
router.get('/user/:user_id',asyncHandler(adminController.getUser));

/**
 * Lấy thông tin toàn bộ người dùng
 * @header user-id
 * @header access-token
 * @header api-key
 * @params type
 */
router.get('/user', asyncHandler(adminController.getListUser));

/**
 * Lấy toàn bộ thông tin yêu cầu xác nhận quyền
 * @header user-id
 * @header access-token
 * @header api-key
 */
router.get('/get-request-role', asyncHandler(adminController.getRequestRole));


module.exports = router;
