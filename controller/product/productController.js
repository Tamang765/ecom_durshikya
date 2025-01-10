const Product = require("../../model/product/productModel");
const cloudinary = require("../../utils/cloudinary");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      category,
      price,
      discount,
      description,
      quantity,
      size,
      color,
    } = req.body;
    if (
      !name ||
      !slug ||
      !category ||
      !price ||
      !discount ||
      !description ||
      !quantity ||
      !size ||
      !color
    ) {
      return res.status(400).send({ message: "All fields required" });
    }

    if (!req.files) {
      return res.status(400).send({ message: "All fields required" });
    }

    let imageFiles = [];
    if (req.files.length) {
      for (const file of req.files) {
        const image = await cloudinary.uploader
          .upload(file.path)
          .catch((error) => {
            console.log(error);
          });
        const neededData = {
          url: image.secure_url,
          public_id: image.public_id,
          api_key: image.api_key,
        };
        imageFiles.push(neededData);
      }
    }

    const product = new Product({
      name,
      slug,
      category,
      price,
      discount,
      description,
      images: imageFiles,
      quantity,
      size,
      color,
    });
    await product.save();

    res
      .status(201)
      .send({ message: "Product Created Successfully", data: product });
  } catch (error) {
    console.log(error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      slug,
      category,
      price,
      discount,
      description,
      quantity,
      size,
      color,
    } = req.body;

    const isExist = await Product.findById({ _id: id });
    if (!isExist) {
      return res.status(400).send({ message: "Product not found" });
    }

    let imageFiles = [];
    if (req.files.length) {
      for (const file of req.files) {
        const image = await cloudinary.uploader
          .upload(file.path)
          .catch((error) => {
            console.log(error);
          });
        const neededData = {
          url: image.secure_url,
          public_id: image.public_id,
          api_key: image.api_key,
        };
        imageFiles.push(neededData);
      }
    }

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        slug,
        category,
        price,
        discount,
        description,
        images: imageFiles.concat(isExist.images),
        quantity,
        size,
        color,
      },
      {
        new: true,
      }
    );

    res
      .status(201)
      .send({ message: "Product Updated Successfully", data: product });
  } catch (error) {
    console.log(error.message);
  }
};

const getProducts = async (req, res) => {
  try {
    const { category_id, color } = req.query;
    console.log(category_id, color, "this is color");
    if (category_id || color) {
      console.log("asdasd");
      const products = await Product.find({
        ...(color && { color: color }),
        ...(category_id && {
          category: category_id,
        }),
      });
      console.log(products);
      return res.status(200).send({ data: products });
    }
    console.log("hello");
    const products = await Product.find();
    console.log(products);
    res.status(200).send({ data: products });
  } catch (error) {
    console.log(error.message);
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const productExist = await Product.findById({ _id: id });
    if (!productExist) {
      return res.status(400).send({ message: " Product not found" });
    }

    return res
      .status(200)
      .send({ message: " Product found", data: productExist });
  } catch (error) {
    console.log(error.message);
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productExist = await Product.findById({ _id: id });
    if (!productExist) {
      return res.status(400).send({ message: "Product not found" });
    }
    await Product.findByIdAndDelete(id);
    return res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {}
};

module.exports = {
  createProduct,
  updateProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
};
