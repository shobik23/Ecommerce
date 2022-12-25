const Product = require("../models/productModel");
const SearchSort = require("../utils/SearchSort");

//Add a prooduct

exports.addProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    return res.status(200).json({
      success: true,
      product: product,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    // console.log(req.query);
    const searchSort = new SearchSort(Product.find(), req.query);
    const count = await Product.count();
    const products = await searchSort.search().filter().pagination(5).query;
    return res.status(200).json({
      message: "Success",
      products,
      count,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({
        success: false,
      });
    }
    let updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      product: updatedProduct,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const product = Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({
        success: false,
      });
    }
    await product.remove();
    res.status(200).json({
      success: true,
      message: "The Product is removed",
    });
  } catch (e) {
    console.log(e);
  }
};
