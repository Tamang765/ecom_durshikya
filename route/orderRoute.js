const express = require("express");
const {checkAuth} = require("../middleware/checkAuth");
const {
  createOrder,
  deleteOrder,
  getOrder,
  updateOrder,
} = require("../controller/order/orderController");

const router = express.Router();

router.get("/", getOrder);
router.post("/", createOrder);
router.delete("/:id", checkAuth, deleteOrder);
router.patch("/:id", checkAuth, updateOrder);

module.exports = router;
