const Product = require("../model/ProductModel");

const createProduct = async (req, res) => {
  try {
    const { name, price, category, rating, description } = req.body;
    //check for validation
    if (!name || !price || !category || !rating || !description) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const product = new Product({
      name,
      price,
      category,
      rating,
      description,
    });
    await product.save();
    res
      .status(201)
      .send({ message: "Product created successfully", data: product });
  } catch (error) {
    console.log(error.message);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send({ data: products });
  } catch (error) {}
};

module.exports = {
  createProduct,
  getProducts,
};
