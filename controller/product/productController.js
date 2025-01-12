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

    console.log(req.body);
    const parsedColors = JSON.parse(color);
    const parsedSizes = JSON.parse(size);

    console.log(req.body, req.files);

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
      size: parsedSizes,
      color: parsedColors,
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
    const parsedColors = JSON.parse(color);
    const parsedSizes = JSON.parse(size);

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
        size: parsedSizes,
        color: parsedColors,
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
    const { category_id, color, size, minPrice, maxPrice } = req.query;

    const filter = {};
    if (category_id) {
      filter.category = category_id;
    }
    if (color) {
      filter.color = color;
    }
    if (size) {
      filter.size = size;
    }

    // if (minPrice) {
    //   filter.price = { minPrice: { $gte: Number(minPrice) } };
    //   // filter.price = { ...filter.price, price: { $gte: Number(minPrice) } };
    // }
    // if (maxPrice) {
    //   filter.price = { ...filter.price, maxPrice: { $lte: Number(maxPrice) } };
    // }

    console.log(filter, "this is filter");

    console.log(category_id, color, "this is color");

    // if (category_id || color) {
    //   const products = await Product.find({
    //     ...(color && { color: color }),
    //     ...(category_id && {
    //       category: category_id,
    //     }),
    //   });

    //   const products = await Product.find(filter);
    //   console.log(products);
    //   return res.status(200).send({ data: products });
    // }
    const products = await Product.find({
      ...(category_id && { category: category_id }),
      ...(color && { color: color }),
      ...(size && { size: size }),

      ...(minPrice && {
        price: { $gte: Number(minPrice) },
      }),
      ...(maxPrice && {
        price: { $lte: Number(maxPrice) },
      }),
      ...(minPrice &&
        maxPrice && {
          price: { $gte: Number(minPrice), $lte: Number(maxPrice) },
        }),
    });

    console.log(products, minPrice, maxPrice);
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
