const Order = require("../../model/order/orderModal");

const getOrder = async (req, res) => {
  try {
    const order = await Order.find();
    res.status(200).send({ data: order });
  } catch (error) {
    console.log(error.message);
  }
};

const createOrder = async (req, res) => {
  try {
    const { order,  address, totalPrice, paymentMethod, status } =
      req.body;
const user = req.user;
    if (
      !order ||

      !address ||
      !totalPrice ||
      !paymentMethod ||
      !status
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const newOrder = new Order({
      order,
      user,
      address,
      totalPrice,
      paymentMethod,
      status,
    });
    const savedOrder = await newOrder.save();

    res
      .status(201)
      .send({ message: "Order created successfully", data: savedOrder });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const orderExist = await Order.findById({ _id: id });
    if (!orderExist) {
      return res.status(400).send({ message: "Order does not exist" });
    }
    await Order.findByIdAndDelete({ _id: id });
    res.status(200).send({ message: "Order deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const orderExist = await Order.findById({ _id: id });
    if (!orderExist) {
      return res.status(400).send({ message: "Order does not exist" });
    }
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
      }
    );
    res
      .status(200)
      .send({ message: "Order updated successfully", data: updatedOrder });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createOrder,
  deleteOrder,
  getOrder,
  updateOrder,
};
