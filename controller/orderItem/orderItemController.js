const OrderItem = require("../../model/orderItem/orderitem");

const createOrderItem = async (req, res) => {
  try {
    const { product, color, size, quantity } = req.body;

    console.log(req.body);

    if (!product || !color || !size || !quantity) {
      return res.status(400).send({ message: "All fields required" });
    }

    const productExist = await OrderItem.findById({ _id: product });

    if (productExist) {
      return res.status(400).send({ message: "Product already exist" });
    }

    const orderItem = await OrderItem.create({
      product,
      color,
      size,
      quantity,
    });

    res
      .status(200)
      .send({ message: "Order item created successfully", data: orderItem });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { createOrderItem };
