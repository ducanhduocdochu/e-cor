const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'DeliveryPerson';
const COLLECTION_NAME = 'DeliveryPersons';

const DeliveryPersonSchema = new Schema(
  {
    location: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const DeliveryPersonModel = model(DOCUMENT_NAME, DeliveryPersonSchema);

module.exports = DeliveryPersonModel;
