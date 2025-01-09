const Category = require("../../model/category/CategoryModal");
const cloudinary = require("../../utils/cloudinary");

const createCategory = async (req, res) => {
  try {
    console.log("object");
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ message: "All fields required" });
    }

    if (!req.file) {
      return res.status(400).send({ message: "Image required" });
    }

    console.log(req.file);
    // upload image to cloudinary

    const image = await cloudinary.uploader
      .upload(req.file.path)
      .catch((error) => {
        console.log(error);
      });
    const category = new Category({
      name,
      image: {
        url: image.secure_url,
        public_id: image.public_id,
        api_key: image.api_key,
      },
    });
    await category.save();

    res
      .status(200)
      .send({ message: "Category created Successfully", data: category });
  } catch (error) {
    console.log(error.message);
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await Category.find();
    console.log(category);
    res.status(200).send({ data: category });
  } catch (error) {
    console.log(error.message);
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);
    const existCategory = await Category.findById({ _id: id });
    if (!existCategory) {
      return res.status(404).send({ message: "Category Not Found" });
    }
    res.status(200).send({ data: existCategory });
  } catch (error) {
    console.log(error.message);
  }
};

const editCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const { name } = req.body;

    const existCategory = await Category.findById({ _id: id });

    if (!existCategory) {
      return res.status(400).send({ message: "Category not found" });
    }

    let image;
    if (req.file) {
      image = await cloudinary.uploader.upload(req.file.path).catch((error) => {
        console.log(error);
      });
      await cloudinary.uploader.destroy(existCategory.image.public_id);
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        name,
        ...(req.file && {
          image: {
            url: image.secure_url,
            public_id: image.public_id,
            api_key: image.api_key,
          },
        }),
      },

      {
        new: true,
      }
    );

    // const fetchCategory = await Category.findById({ _id: id });

    res.status(200).send({
      message: "Category updated successfully",
      data: updatedCategory,
      // data: fetchCategory,
    });
  } catch (error) {}
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete({ _id: id });
    res.status(200).send({ message: "Category Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createCategory,
  getCategory,
  editCategory,
  deleteCategory,
  getSingleCategory,
};
