const CategoryModel = require("../category.model");

const findCategoryById = async ({ category_id }) => {
  return await CategoryModel.findOne({
    _id: category_id,
  });
};

const getListCategory = async ({ limit, sortField, sortOrder }) => {
  return await CategoryModel.find()
    .limit(limit)
    .sort({ [sortField]: sortOrder });
};

const createCategory = async ({ category_name, attributes }) => {
  return await CategoryModel.create({
    category_name,
    attributes,
  });
};

const createOrUpdateCategory = async ({ category_id, data }) => {
  return await CategoryModel.findOneAndUpdate({ _id: category_id }, data, {
    upsert: true,
    new: true,
  });
};

const deleteCategory = async ({ category_id }) => {
  return await CategoryModel.deleteOne({ _id: category_id });
};

module.exports = {
  findCategoryById,
  getListCategory,
  createCategory,
  createOrUpdateCategory,
  deleteCategory,
};
