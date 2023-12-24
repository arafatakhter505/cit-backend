const express = require("express");
const {
  cartAdd,
  getCartById,
  updateCart,
  deleteCart,
} = require("../controllers/cart");

const cartRouter = express.Router();

// cart add
cartRouter.post("/add", cartAdd);

// get cart by id
cartRouter.get("/:id", getCartById);

// update cart
cartRouter.put("/:id", updateCart);

// delete cart
cartRouter.delete("/:id", deleteCart);

module.exports = cartRouter;
