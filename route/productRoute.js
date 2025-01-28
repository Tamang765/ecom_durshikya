const express = require("express");

const {checkAuth} = require("../middleware/checkAuth");
const {
  createProduct,
  updateProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  deleteProductImage,
  getProductBySlug,
} = require("../controller/product/productController");
const upload = require("../utils/upload");

const router = express.Router();

router.post("/", upload.array("images", 10), createProduct);
router.patch("/:id", upload.array("images", 10), updateProduct);
router.get("", getProducts);
router.get("/single/:slug", getProductBySlug);
router.get("/:id", getSingleProduct);
router.delete("/:id", deleteProduct);
router.delete("/:productId/:imageId", deleteProductImage);


module.exports = router;
