const OrderItem = require("../../model/orderItem/orderitem");

const createOrderItem = async (req, res) => {
  try {
    const { product, color, size, quantity } = req.body;

    const user = req.user;

    console.log(req.body);

    if (!product || !color || !size || !quantity) {
      return res.status(400).send({ message: "All fields required" });
    }

    const productExist = await OrderItem.findOne({
      product,
      color,
      size,
      user,
    });

    console.log(productExist, "this is product exists");

    if (productExist) {
      return res.status(400).send({ message: "Product already exist" });
    }

    const orderItem = await OrderItem.create({
      product,
      color,
      size,
      quantity,
      user,
    });

    res
      .status(200)
      .send({ message: "Order item created successfully", data: orderItem });
  } catch (error) {
    console.log(error.message);
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
    const orderItem = await OrderItem.find({ user });
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
