const CategoryService = require("../services/category.service");
const { CREATED, OK, SuccessResponse } = require("../core/success.response");

class CategoryController {
  getCategory = async (req, res, next) => {
    new OK({
      message: "Get category successfully",
      metadata: await CategoryService.getCategory(req.params),
    }).send(res);
  };

  getCategoryList = async (req, res, next) => {
    new OK({
      message: "Get category list successfully",
      metadata: await CategoryService.getCategoryList(req.query),
    }).send(res);
  };

  createCategory = async (req, res, next) => {
    new CREATED({
      message: "Create category successfully",
      metadata: await CategoryService.createCategory(req.body),
    }).send(res);
  };

  updateCategory = async (req, res, next) => {
    new CREATED({
      message: "Update category successfully",
      metadata: await CategoryService.updateCategory(req.params, req.body),
    }).send(res);
  };

  deleteCategory = async (req, res, next) => {
    new CREATED({
      message: "Delete category successfully",
      metadata: await CategoryService.deleteCategory(req.params),
    }).send(res);
  };
}

module.exports = new CategoryController();
