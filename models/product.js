const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: String,
    price: [
      {
        amount: Number,
        size: [String],
      },
    ],
    colors: [String],
    sizes: [String],
    images: [
      {
        url: String,
        color: String,
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
