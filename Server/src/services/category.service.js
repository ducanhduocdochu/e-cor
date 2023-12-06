const { NotFoundError, BadRequestError } = require("../core/error.response");
const { findCategoryById, getListCategory, createOrUpdateCategory, deleteCategory, createCategory } = require("../models/repositories/product.repo");

class CategoryService {
  static getCategory = async ({ category_id }) => {
    const category = await findCategoryById({category_id })
    if (!category){
      throw new NotFoundError("Error: No categories exist")
    } 
    return {
      code: 200,
      metadata: category,
    };
  };
  static getCategoryList = async ({limit,sortField, sortOrder}) => {
    const listCategory = await getListCategory({
      limit: limit ? limit : 10,
      sortField: sortField ? sortField : "createdAt",
      sortOrder: sortOrder ? sortOrder : "asc",
    });
    return {
      code: 200,
      metadata: listCategory,
    };
  };
  static createCategory = async ({ category_name, attributes }) => {
    const newCategory = await createCategory({category_name, attributes})
    if(!newCategory){
      throw new BadRequestError("Error: Create failure category")
    }
    return {
      code: 201,
      metadata: newCategory,
    };
  };
  static updateCategory = async ({ category_id }, data) => {
    const updateCategory = await createOrUpdateCategory({category_id, data})
    if(!updateCategory){
      throw new BadRequestError("Error: Create failure category")
    }
    return {
      code: 201,
      metadata: updateCategory,
    };
  };
  static deleteCategory = async ({ category_id }) => {
    const deletedCategory = await deleteCategory({category_id})
    if(!deletedCategory){
      throw new BadRequestError("Error: Create failure category")
    }
    return {
      code: 201,
      metadata: deletedCategory,
    };
  };
}

module.exports = CategoryService;
