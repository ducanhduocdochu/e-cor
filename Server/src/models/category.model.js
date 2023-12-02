const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'Category';
const COLLECTION_NAME = 'Categories';

const CategorySchema = new Schema(
  {
    category_name: {
      type: String,
      require: true,
    },
    attributes: {
        type: [String],
        require: true
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const CategoryModel = model(DOCUMENT_NAME, CategorySchema);

module.exports = CategoryModel;
