const express = require("express");

const checkAuth = require("../middleware/checkAuth");
const {
  createProduct,
  updateProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
} = require("../controller/product/productController");
const upload = require("../utils/upload");

const router = express.Router();

router.post("/", upload.array("images", 10), createProduct);
router.patch("/:id", upload.array("images", 10), updateProduct);
router.get("", getProducts);
router.get("/:id",getSingleProduct)
router.delete("/:id",deleteProduct)
module.exports = router;
