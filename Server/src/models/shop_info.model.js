const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'Shop';
const COLLECTION_NAME = 'Shops';

const ShopSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    address: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      require: true,
    },
    categories: {
        type: [{type: Schema.Types.ObjectId ,ref: 'Category',}],
        default: [],
        require: true,
      },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const ShopModel = model(DOCUMENT_NAME, ShopSchema);

module.exports = ShopModel;
