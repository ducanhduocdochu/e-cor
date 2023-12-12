const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'Supplier';
const COLLECTION_NAME = 'Suppliers';

const SupplierSchema = new Schema(
  {
    supplier_name: {
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

const SupplierModel = model(DOCUMENT_NAME, SupplierSchema);

module.exports = SupplierModel;
