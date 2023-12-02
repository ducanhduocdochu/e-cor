import { Router } from 'express';
import { authentication } from '../../auth/authUtils';
import productController from '../../controllers/product.controller';
import asyncHandler from '../../helper/asyncHandler';

const router = Router();

// Tìm kiếm
// router.get('/search/:keySearch', asyncHandler(productController.getListSearchProduct));

// Lấy toàn bộ sản phẩm
// router.get('', asyncHandler(productController.findAllProducts));

// Lấy một sản phẩm
// router.get('/:product_id', asyncHandler(productController.findProduct));

// Lấy sản phẩm của shop
router.get('/shop/:shop_id', asyncHandler(productController.getAllProductsForShop));

router.use(authentication);

// router.use(shop)

// Tạo sản phẩm
// router.post('', asyncHandler(productController.createProduct));

// Cập nhật sản phẩm
// router.patch('/:product_id', asyncHandler(productController.updateProduct));

// Xóa sản phẩm
// router.delete('/:product_id', asyncHandler(productController.deleteProduct));

// Lấy toàn bộ sản phẩm của shop
// router.get('/shop/:shop_id', asyncHandler(productController.getAllProductsForShop));

// Publish sản phẩm
// router.post('/publish/:product_id', asyncHandler(productController.publishProductByShop));

// unPublish sản phẩm
// router.post('/unPublish/:product_id', asyncHandler(productController.unPublishProductByShop));

// Lấy toàn bộ sản phẩm nháp
// router.get('/drafts/all', asyncHandler(productController.getAllDraftsForShop));

// Lấy toàn bộ sản phẩm công khai
// router.get('/published/all', asyncHandler(productController.getAllPublishForShop));

export default router;
