const OrderItem = require("../../model/orderItem/orderitem");

const createOrderItem = async (req, res) => {
  try {
    const { product, color, size, quantity } = req.body;

    const user = req.user;

    if (!product || !color || !size || !quantity) {
      return res.status(400).send({ message: "All fields required" });
    }

    const productExist = await OrderItem.findOne({
      product,
      color,
      size,
      user,
    });

    if (productExist) {
      return res.status(400).send({ message: "Product already exists" });
    }

    const orderItem = await OrderItem.create({
      product,
      color,
      size,
      quantity,
      user,
    });

    // Populate the product details in the orderItem
    const populatedOrderItem = await orderItem.populate("product");

    res
      .status(200)
      .send({ message: "Order item created successfully", data: populatedOrderItem });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal server error" });
  }
};


const editOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { product, color, size, quantity } = req.body;

    const orderItemExist = await OrderItem.findById({ _id: id });
    if (!orderItemExist) {
      return res.status(400).send({ message: "Order item not found" });
    }

    const updatedOrderItem = await OrderItem.findByIdAndUpdate(
      id,
      {
        product,
        color,
        size,
        quantity,
      },
      {
        new: true,
      }
    );

    res.status(200).send({
      message: "Order item updated successfully",
      data: updatedOrderItem,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const getUserOrderItem = async (req, res) => {
  try {
    const user = req.user;
    const orderItem = await OrderItem.find({ user }).populate("product");
    res.status(200).send({ data: orderItem });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    await OrderItem.findByIdAndDelete({ _id: id });
    res.status(200).send({ message: "Order item deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  createOrderItem,
  editOrderItem,
  getUserOrderItem,
  deleteOrderItem,
};
