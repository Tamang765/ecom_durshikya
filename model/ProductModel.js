const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    price: { type: "string", required: true },
    category: { type: "string", required: true },
    image: { type: "string", required: false },
    rating: { type: "string", required: true },
    description: { type: "string", required: true },
  },
  {
    timestamps: true,
  }
);

const product = mongoose.model("product", productSchema);
module.exports = product;
