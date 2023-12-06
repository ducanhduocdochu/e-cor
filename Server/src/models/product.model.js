"use strict";

const { model, Schema } = require("mongoose"); // Erase if already required
const slugify = require("slugify");

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

const productSchema = new Schema(
  {
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_description: String,
    product_slug: String,
    categoy_id: { type: Schema.Types.ObjectId, ref: "Category" },
    product_price: { type: Number, required: true },
    product_slug: { type: Number, required: true },
    shop_id: { type: Schema.Types.ObjectId, ref: "Shop" },
    product_ratingsAvergage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be above 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    product_attributes: {
      type: Map, 
      of: String,
      default: {},
    },
    // product_variations: { type: Array, default: [] },
    isDraft: { type: Boolean, default: true, index: true, select: false },
    isPublished: { type: Boolean, default: false, index: true, select: false },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

// Create index for search
productSchema.index({ product_name: "text", product_description: "text" });

// Document middleware: runs before .save() and .create()
productSchema.pre("save", function (next) {
  this.product_slug = slugify(this.product_name, { lower: true });
  next();
});

module.exports = {
  product: model(DOCUMENT_NAME, productSchema),
};
