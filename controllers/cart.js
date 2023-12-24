const Cart = require("../models/cart");

// cart add
const cartAdd = async (req, res) => {
  try {
    const { userId, items } = req.body;
    const existingCart = await Cart.findOne({ userId });

    if (!existingCart) {
      const addCart = new Cart({ userId, items });
      await addCart.save();
      return res.status(200).json({
        success: true,
        message: "Successfully product add in cart",
      });
    } else {
      await Cart.findByIdAndUpdate(existingCart?.id, { items });
      return res.status(200).json({
        success: true,
        message: "Successfully product add in cart",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get cart by id
const getCartById = async (req, res) => {
  try {
    const id = req.params.id;
    const cart = await Cart.find({ userId: id });

    if (!cart) {
      return res.status(200).json({ success: false, message: "No cart found" });
    }

    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    return res.status(404).json({ success: false, message: "No cart found" });
  }
};

// update cart
const updateCart = async (req, res) => {
  try {
    const id = req.params.id;
    const { items } = req.body;

    const cart = await Cart.findByIdAndUpdate(id, { items });

    if (!cart) {
      return res.status(200).json({ success: false, message: "No cart found" });
    }

    return res.status(200).json({
      success: true,
      message: "Update successfully",
      cart,
    });
  } catch (error) {
    return res.status(404).json({ success: false, message: "No cart found" });
  }
};

// delete cart
const deleteCart = async (req, res) => {
  try {
    const id = req.params.id;
    const cart = await Cart.findByIdAndDelete(id);
    if (!cart) {
      return res.status(200).json({ success: false, message: "No cart found" });
    }

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({ success: false, message: "No cart found" });
  }
};

module.exports = {
  cartAdd,
  getCartById,
  updateCart,
  deleteCart,
};
