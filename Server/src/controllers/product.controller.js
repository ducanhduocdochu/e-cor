const ProductFactory = require("../services/product.service");
const { OK } = require("../utils/statusCodes");

class ProductController {
  async getListSearchProduct(req, res, next) {
    new OK({
      message: "Get list search Product successfully",
      metadata: await ProductFactory.getListSearchProduct(req.params),
    }).send(res);
  }

  async findAllProducts(req, res, next) {
    new OK({
      message: "Get all product successfully",
      metadata: await ProductFactory.findAllProducts(),
    }).send(res);
  }

  async findProduct(req, res, next) {
    new OK({
      message: "Get product successfully",
      metadata: await ProductFactory.findProduct(req.params),
    }).send(res);
  }

  async getAllProductsForShop(req, res, next) {
    new OK({
      message: "Get all product successfully",
      metadata: await ProductFactory.getAllProductsForShop(req.params),
    }).send(res);
  }

  async createProduct(req, res, next) {
    new OK({
      message: "Created product successfully",
      metadata: await ProductFactory.createProduct(req.params),
    }).send(res);
  }

  async updateProduct(req, res, next) {
    new OK({
      message: "Updated product successfully",
      metadata: await ProductFactory.updateProduct(req.params),
    }).send(res);
  }

  async deleteProduct(req, res, next) {
    new OK({
      message: "Delete product successfully",
      metadata: await ProductFactory.deleteProduct(req.params),
    }).send(res);
  }

  async publishProductByShop(req, res, next) {
    new OK({
      message: "Publish product successfully",
      metadata: await ProductFactory.publishProductByShop(req.params),
    }).send(res);
  }

  async unPublishProductByShop(req, res, next) {
    new OK({
      message: "Unpublish product successfully",
      metadata: await ProductFactory.unPublishProductByShop(req.params),
    }).send(res);
  }

  async getAllDraftsForShop(req, res, next) {
    new OK({
      message: "Get product successfully",
      metadata: await ProductFactory.publishProductByShop(req.params),
    }).send(res);
  }

  async getAllPublishForShop(req, res, next) {
    new OK({
      message: "Get product successfully",
      metadata: await ProductFactory.unPublishProductByShop(req.params),
    }).send(res);
  }
}

module.exports = new ProductController();
