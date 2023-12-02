// import { Request, Response, NextFunction } from 'express';
// import { SuccessResponse } from '../core/success.response';
// import ProductFactory from '../services/product.service';

// class ProductController {
//     createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         new SuccessResponse({
//             message: 'Create new Product success!',
//             metadata: await ProductFactory.createProduct(req.body.product_type, {
//                 ...req.body,
//                 product_shop: req.user.userId,
//             }),
//         }).send(res);
//     };

//     updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         new SuccessResponse({
//             message: 'Update new Product success!',
//             metadata: await ProductFactory.updateProduct(req.body.product_type, req.params.product_id, {
//                 ...req.body,
//                 product_shop: req.user.userId,
//             }),
//         }).send(res);
//     };

//     publishProductByShop = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         new SuccessResponse({
//             message: 'Publish Product success!',
//             metadata: await ProductFactory.publishProductByShop({
//                 product_id: req.params.product_id,
//                 product_shop: req.user.userId,
//             }),
//         }).send(res);
//     };

//     unPublishProductByShop = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         new SuccessResponse({
//             message: 'Unpublish Product success!',
//             metadata: await ProductFactory.unPublishProductByShop({
//                 product_id: req.params.product_id,
//                 product_shop: req.user.userId,
//             }),
//         }).send(res);
//     };

//     getAllDraftsForShop = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         new SuccessResponse({
//             message: 'Get list Draft success',
//             metadata: await ProductFactory.findAllDraftForShop({
//                 product_shop: req.user.userId,
//             }),
//         }).send(res);
//     };

//     getAllPublishForShop = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         new SuccessResponse({
//             message: 'Get list Publish success',
//             metadata: await ProductFactory.findAllPublishForShop({
//                 product_shop: req.user.userId,
//             }),
//         }).send(res);
//     };

//     getListSearchProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         new SuccessResponse({
//             message: 'Get list Search Product success',
//             metadata: await ProductFactory.searchProducts(req.params),
//         }).send(res);
//     };

//     findAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         new SuccessResponse({
//             message: 'Get list All Products success',
//             metadata: await ProductFactory.findAllProducts(req.query),
//         }).send(res);
//     };

//     findProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         console.log(req.params);
//         new SuccessResponse({
//             message: 'Get Product success',
//             metadata: await ProductFactory.findProduct({
//                 product_id: req.params.product_id,
//             }),
//         }).send(res);
//     };
// }

// export default new ProductController();
