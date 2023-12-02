const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'TokenVerify';
const COLLECTION_NAME = 'TokenVerifys';

const TokenVerifySchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const tokenVerifyModel = model(DOCUMENT_NAME, TokenVerifySchema);

module.exports = tokenVerifyModel;
