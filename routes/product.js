const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const productRouter = express.Router();

// product creat
productRouter.post("/add", createProduct);

// get all products
productRouter.get("/", getAllProducts);

// get product by id
productRouter.get("/:id", getProductById);

// update product
productRouter.put("/:id", updateProduct);

// delete product
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;
