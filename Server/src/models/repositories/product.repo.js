const { unGetSelectData, getSelectData } = require("../../utils");
const CategoryModel = require("../category.model");
const { product } = require("../product.model");

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

const findProductById = async ({ product_id }) => {
  return await product.findOne({
    _id: product_id,
  });
};

const updateProductById = async ({
  product_id,
  payload,
  model,
  isNew = true,
}) => await model.findByIdAndUpdate(product_id, payload, { new: isNew });

const deleteProductById = async ({ product_id }) =>
  await product.deleteOne({ _id: product_id });

const deleteAttributeProductById = async ({ product_id, model }) =>
  await model.deleteOne({ _id: product_id });

const findAllDraftsForShop = async ({ query, limit, skip }) => {
  return await queryProduct({ query, limit, skip });
};

const findAllPublishForShop = async ({ query, limit, skip }) => {
  return await queryProduct({ query, limit, skip });
};

const publishProductByShop = async ({ product_id }) => {
  const foundProduct = await findProductById({product_id});
  foundProduct.isDraft = false;
  foundProduct.isPublished = true;

  const updatedShop = await product.findByIdAndUpdate(foundProduct._id, foundProduct);
  const modifiedCount = updatedShop ? 1 : 0;
  return modifiedCount;
};

const unPublishProductByShop = async ({ product_id }) => {
  const foundProduct = await findProductById({product_id});

  foundProduct.isDraft = true;
  foundProduct.isPublished = false;

  const updatedShop = await product.findByIdAndUpdate(foundProduct._id, foundProduct);
  const modifiedCount = updatedShop ? 1 : 0;

  return modifiedCount;
};

const searchProductByUser = async ({ keySearch }) => {
  const regexSearch = new RegExp(keySearch);
  const result = await product
    .find(
      { isPublished: true, $text: { $search: regexSearch } },
      { score: { $meta: "textScore" } }
    )
    .sort({ score: { $meta: "textScore" } })
    .lean();
  return result;
};

const findAllProducts = async ({ limit, sort, page, filter, select }) => {
  const skip = (page - 1) * limit;
  const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };
  const products = await product
    .find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(getSelectData(select))
    .lean();

  return products;
};

const findProduct = async ({ product_id, unSelect }) => {
  return await product.findOne({product_id, isPublished: true}).select(unGetSelectData(unSelect));
};

const queryProduct = async ({ query, limit, skip }) => {
  return await product
    .find(query)
    .populate("product_shop", "name email -_id")
    .sort({ updateAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();
};

const checkProductByServer = async (products) => {
  return await Promise.all(
    producs.map(async (product) => {
      const foundProduct = await findProductById(product.productId);

      if (foundProduct) {
        return {
          price: foundProduct.product_price,
          quantity: product.quantity,
          productId: product.productId,
        };
      }
    })
  );
};

module.exports = {
  findCategoryById,
  getListCategory,
  createCategory,
  createOrUpdateCategory,
  deleteCategory,
  findProductById,
  updateProductById,
  deleteProductById,
  deleteAttributeProductById,
  findAllDraftsForShop,
  findAllPublishForShop,
  publishProductByShop,
  unPublishProductByShop,
  searchProductByUser,
  findAllProducts,
  findProduct,
  queryProduct,
  checkProductByServer,
};
