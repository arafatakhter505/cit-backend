const Product = require("../models/product");

// create product
const createProduct = async (req, res) => {
  try {
    const product = req.body;

    const addProduct = new Product(product);
    await addProduct.save();

    return res.status(200).json({
      success: true,
      message: "Successfully product added",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get all products
const getAllProducts = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const filter = {
      $or: [{ title: { $regex: searchRegExp } }],
    };

    const products = await Product.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Product.find(filter).countDocuments();

    if (products.length === 0) {
      return res.status(200).json({ success: false, message: "No found" });
    }

    return res.status(200).json({
      success: true,
      products,
      pagination: {
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        previousPage: page - 1 > 0 ? page - 1 : null,
        nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get product by id
const getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(200)
        .json({ success: false, message: "No product found" });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "No product found" });
  }
};

// update product
const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;

    const product = await Product.findByIdAndUpdate(id, update);

    if (!product) {
      return res
        .status(200)
        .json({ success: false, message: "No product found" });
    }

    return res.status(200).json({
      success: true,
      message: "Update successfully",
      product,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "No product found" });
  }
};

// delete product
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(200)
        .json({ success: false, message: "No product found" });
    }

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "No product found" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
