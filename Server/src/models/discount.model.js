const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Discount";
const COLLECTION_NAME = "Discounts";

const DiscountSchema = new Schema(
  {
    discount_name: {
      type: String,
      require: true,
    },
    discount_description: {
      type: String,
      require: true,
    },
    discount_type: {
      type: String,
      require: true,
      enum: ["Percent", "Value"],
    },
    discount_value: {
      type: Number,
      require: true,
    },
    discount_code: {
      type: String,
      require: true,
    },
    discount_start_date: {
      type: Date,
      require: true,
    },
    discount_end_date: {
      type: Date,
      require: true,
    },
    discount_max_uses: {
      type: Number,
      require: true,
    },
    discount_max_value: {
      type: String,
      require: true,
    },
    discount_use_count: {
      type: Number,
      require: true,
    },
    discount_applies_to: {
      type: [{ type: Schema.Types.ObjectId, ref: Shop }],
      require: true,
    },
    discount_invisable: {
      type: Boolean,
      require: true,
    },
    discount_applies_type: {
      type: String,
      require: true,
      enum: ["All", "Shop"],
    },
    discount_min_order_value: {
      type: Number,
      require: true,
    },
    shop_id: {
      type: Schema.Types.ObjectId,
      ref: Shop,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const DiscountModel = model(DOCUMENT_NAME, DiscountSchema);

module.exports = DiscountModel;
