const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timeStamps: true }
);

// Add a compound index to ensure uniqueness of product, color, size, and user
orderItemSchema.index(
  { product: 1, color: 1, size: 1, user: 1 },
  { unique: true }
);

const OrderItem = mongoose.model("orderItem", orderItemSchema);

module.exports = OrderItem;
