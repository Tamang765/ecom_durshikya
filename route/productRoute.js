const express = require("express");
const {
  createProduct,
  getProducts,
} = require("../controller/productController");
const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.put("/", createProduct);

module.exports = router;
