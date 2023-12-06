import { Router } from 'express';
import { authentication } from '../../auth/authUtils';
import productController from '../../controllers/product.controller';
import asyncHandler from '../../helper/asyncHandler';
import { apiKey, permission } from '../../auth/checkAuth';

const router = Router();

/**
 * Tìm kiếm sản phẩm
 * @query keySearch
 */
router.get('/search/:keySearch', asyncHandler(productController.getListSearchProduct));

/**
 * Lấy toàn bộ sản phẩm
 * @header user_id
 * @header api_key
 * @header access_token
 */
router.get('', asyncHandler(productController.findAllProducts));

/**
 * Lấy một sản phẩm
 * @header user_id
 * @header api_key
 * @header access_token
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
 * @params product_id
 */
router.post('',authentication, apiKey, permission(["shop"]), asyncHandler(productController.createProduct));

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
router.post('/unPublish/:product_id',authentication, apiKey, permission(["shop"]), asyncHandler(productController.unPublishProductByShop));

/**
 * Lấy toàn bộ sản phẩm nháp
 * @header user_id
 * @header api_key
 * @header access_token
 * @params product_id
 */
router.get('/drafts/all', authentication, apiKey, permission(["shop"]),asyncHandler(productController.getAllDraftsForShop));

/**
 * Lấy toàn bộ sản phẩm công khai
 * @header user_id
 * @header api_key
 * @header access_token
 * @params product_id
 */
router.get('/published/all',authentication, apiKey, permission(["shop"]), asyncHandler(productController.getAllPublishForShop));

export default router;


