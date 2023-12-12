const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "RegisterRoleDraft";
const COLLECTION_NAME = "RegisterRoleDrafts";

const RegisterRoleDraftSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    data: {
      type: Map,
      of: String,
      default: {},
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const registerRoleDraftModel = model(DOCUMENT_NAME, RegisterRoleDraftSchema);

module.exports = registerRoleDraftModel;
