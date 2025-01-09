const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const {
  createCategory,
  getCategory,
  editCategory,
  deleteCategory,
  getSingleCategory,
} = require("../controller/category/categoryController");
const upload = require("../utils/upload");

const router = express.Router();

router.get("/", getCategory);
router.post("/", checkAuth, upload.single("image"), createCategory);
router.patch("/:id", checkAuth, upload.single("image"), editCategory);
router.delete("/:id", checkAuth, deleteCategory);
router.get("/:id", getSingleCategory);

module.exports = router;
