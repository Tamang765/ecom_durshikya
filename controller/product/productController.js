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

    console.log(req.files);
    if (req.files.length) {
      for (const file of req.files) {
        await cloudinary.uploader.upload(file.path).catch((error) => {
          console.log(error);
        });
      }
    }
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
  } catch (error) {}
};

module.exports = {
  createProduct,
};
