const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'ApiKey';
const COLLECTION_NAME = 'ApiKeys';

const ApiKeySchema = new Schema(
  {
    api_key: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const ApiKeyModel = model(DOCUMENT_NAME, ApiKeySchema);

module.exports = ApiKeyModel;
