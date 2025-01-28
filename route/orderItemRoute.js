const express = require("express");
const {checkAuth,checkUserAuth} = require("../middleware/checkAuth");
const {
  createOrderItem,
  getUserOrderItem,
  deleteOrderItem,
  editOrderItem,
} = require("../controller/orderItem/orderItemController");

const router = express.Router();

router.post("/", checkAuth, createOrderItem);
router.patch("/:id", checkUserAuth, editOrderItem);
router.get("/cart", checkUserAuth, getUserOrderItem);
router.delete("/:id", checkUserAuth, deleteOrderItem);

module.exports = router;
