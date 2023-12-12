const express = require('express');
const asyncHandler = require('../../helper/asyncHandler');
const productController = require('../../controllers/product.controller');
const { authentication } = require('../../auth/authUtils');
const { apiKey, permission } = require('../../auth/checkAuth');

const router = express.Router();

/**
 * Tìm kiếm sản phẩm
 * @query keySearch
 */
router.get('/search/:keySearch', asyncHandler(productController.getListSearchProduct));

/**
 * Lấy toàn bộ sản phẩm
 */
router.get('', asyncHandler(productController.findAllProducts));

/**
 * Lấy một sản phẩm
 * @params product_id
 */
router.get('/:product_id', asyncHandler(productController.findProduct));

/**
 * Lấy sản phẩm của shop (draft + publish)
 * @header user_id
 * @header api_key
 * @header access_token
 * @params shop_id
 */
router.get('/shop/:shop_id', authentication, apiKey, permission(["shop"]), asyncHandler(productController.getAllProductsForShop));

/**
 * Tạo sản phẩm
 * @header user_id
 * @header api_key
 * @header access_token
 * @params type
 * @body
 */
router.post('/:type',authentication, apiKey, permission(["shop"]), asyncHandler(productController.createProduct));

/**
 * Cập nhật sản phẩm
 * @header user_id
 * @header api_key
 * @header access_token
 * @params product_id
 */
router.patch('/:product_id', authentication, apiKey, permission(["shop"]), asyncHandler(productController.updateProduct));

/**
 * Xóa sản phẩm
 * @header user_id
 * @header api_key
 * @header access_token
 * @params product_id
 */
router.delete('/:product_id',authentication, apiKey, permission(["shop"]), asyncHandler(productController.deleteProduct));

/**
 * Publish sản phẩm
 * @header user_id
 * @header api_key
 * @header access_token
 * @params product_id
 */
router.post('/publish/:product_id',authentication, apiKey, permission(["shop"]), asyncHandler(productController.publishProductByShop));

/**
 * unPublish sản phẩm
 * @header user_id
 * @header api_key
 * @header access_token
 * @params product_id
 */
router.post('/un-publish/:product_id',authentication, apiKey, permission(["shop"]), asyncHandler(productController.unPublishProductByShop));

/**
 * Lấy toàn bộ sản phẩm nháp
 * @header user_id
 * @header api_key
 * @header access_token
 * @params product_id
 */
router.get('/drafts', authentication, apiKey, permission(["shop"]),asyncHandler(productController.getAllDraftsForShop));

/**
 * Lấy toàn bộ sản phẩm công khai
 * @header user_id
 * @header api_key
 * @header access_token
 * @params product_id
 */
router.get('/published',authentication, apiKey, permission(["shop"]), asyncHandler(productController.getAllPublishForShop));

module.exports = router;