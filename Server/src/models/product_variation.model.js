// "use strict";

// const { model, Schema } = require("mongoose"); // Erase if already required
// const slugify = require("slugify");

// const DOCUMENT_NAME = "Product";
// const COLLECTION_NAME = "Products";

// const productSchema = new Schema(
//   {
//     product_name: { type: String, required: true },
//     product_thumb: { type: String, required: true },
//     product_description: String,
//     product_slug: String,
//     product_price: { type: Number, required: true },
//     product_slug: { type: Number, required: true },
//     product_rating: {
//       type: Number,
//       default: 4.5,
//       min: [1, "Rating must be above 1.0"],
//       max: [5, "Rating must be above 5.0"],
//       set: (val) => Math.round(val * 10) / 10,
//     },
//     category_id: { type: Schema.Types.ObjectId, ref: "Category" },
//     shop_id: { type: Schema.Types.ObjectId, ref: "Shop" },
//     isDraft: { type: Boolean, default: true, index: true, select: false },
//     isPublished: { type: Boolean, default: false, index: true, select: false },
//   },
//   {
//     collection: COLLECTION_NAME,
//     timestamps: true,
//   }
// );

// // Create index for search
// productSchema.index({ product_name: "text", product_description: "text" });

// // Document middleware: runs before .save() and .create()
// productSchema.pre("save", function (next) {
//   this.product_slug = slugify(this.product_name, { lower: true });
//   next();
// });

// // define the product type = clothing
// // find in category

// const clothingSchema = new Schema(
//   {
//     brand: String,
//     size: String,
//     material: String,
//     shop_id: { type: Schema.Types.ObjectId, ref: "Shop" },
//   },
//   {
//     collection: "clothes",
//     timestamps: true,
//   }
// );

// const electronicSchema = new Schema(
//   {
//     manufacturer: String,
//     model: String,
//     color: String,
//     shop_id: { type: Schema.Types.ObjectId, ref: "Shop" },
//   },
//   {
//     collection: "electronics",
//     timestamps: true,
//   }
// );

// const furnitureSchema = new Schema(
//   {
//     brand: String,
//     size: String,
//     material: String,
//     shop_id: { type: Schema.Types.ObjectId, ref: "Shop" },
//   },
//   {
//     collection: "furnitures",
//     timestamps: true,
//   }
// );

// // Lấy danh sách các danh mục từ cơ sở dữ liệu
// CategoryModel.find({}, (err, categories) => {
//   if (err) {
//     console.error("Lỗi khi lấy danh sách danh mục:", err);
//     return;
//   }

//   // Tạo các mô hình Electronic, Clothing, và Furniture dựa trên danh sách danh mục
//   categories.forEach((category) => {
//     const modelName = category.name;
//     const attributes = category.attributes;

//     const productSchema = new Schema(
//       {
//         product_name: { type: String, required: true },
//         attributes: {
//           type: Map,
//           of: String,
//         },
//         product_thumb: { type: String, required: true },
//         product_description: String,
//         // ...
//       },
//       {
//         collection: COLLECTION_NAME,
//         timestamps: true,
//       }
//     );

//     const Product = model(modelName, productSchema);
//   });
// });

// module.exports = {
//   product: model(DOCUMENT_NAME, productSchema),
//   electronic: model("Electronic", electronicSchema),
//   clothing: model("Clothing", clothingSchema),
//   furniture: model("Furniture", furnitureSchema),
// };
