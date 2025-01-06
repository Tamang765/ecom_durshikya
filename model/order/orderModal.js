const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderItem",
    },
  },
  { timeStamps: true }
);

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
