const express = require("express");

const checkAuth = require("../middleware/checkAuth");
const { createProduct } = require("../controller/product/productController");
const upload = require("../utils/upload");

const router = express.Router();

router.post("/", upload.array("images", 10), createProduct);

module.exports = router;
