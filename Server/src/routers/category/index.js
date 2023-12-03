const express = require('express');
const asyncHandler = require('../../helper/asyncHandler');
const categoryController = require('../../controllers/category.controller');
const { authentication } = require('../../auth/authUtils');
const { apiKey, permission } = require('../../auth/checkAuth');

const router = express.Router();

/**
 * Lấy thông tin danh mục sản phẩm
 * @params category_id
 */
router.get('/:category_id', asyncHandler(categoryController.getCategory));

/**
 * Lấy thông tin toàn bộ danh mục
 */
router.get('/', asyncHandler(categoryController.getCategoryList));

/**
 * Tạo danh mục
 * @header user-id
 * @header access-token
 * @header api-key
 */
router.post('/', authentication, apiKey, permission(["admin"]), asyncHandler(categoryController.createCategory));

/**
 * Cập nhật thông tin danh mục
 * @header user-id
 * @header access-token
 * @header api-key
 * @params category_id
 */
router.put('/:category_id', authentication, apiKey, permission(["admin"]), asyncHandler(categoryController.updateCategory));

/**
 * Xóa danh mục
 * @header user-id
 * @header access-token
 * @header api-key
 * @params category_id
 */
router.delete('/:category_id', authentication, apiKey, permission(["admin"]), asyncHandler(categoryController.deleteCategory));

module.exports = router;
