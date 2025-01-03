const express = require("express");
const {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} = require("../controller/productController");
const upload = require("../utils/upload");
const router = express.Router();

router.post("/", upload.single("image"), createProduct);
router.get("/", getProducts);

// router.put("/", createProduct);

module.exports = router;
