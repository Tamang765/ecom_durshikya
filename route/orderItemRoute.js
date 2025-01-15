const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const {
  createOrderItem,
  getUserOrderItem,
  deleteOrderItem,
} = require("../controller/orderItem/orderItemController");

const router = express.Router();

router.post("/", checkAuth, createOrderItem);
router.patch("/:id", checkAuth, createOrderItem);
router.get("/cart", checkAuth, getUserOrderItem);
router.delete("/:id", checkAuth, deleteOrderItem);

module.exports = router;
