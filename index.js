const express = require("express");
const userRoute = require("./route/userRoute");
const categoryRoute = require("./route/categoryRoute");
const productRoute = require("./route/productRoute");
const orderRoute = require("./route/orderItemRoute");
const stripe = require("stripe")(
  "sk_test_51Qh9bq2N6bV3MNFWEa19HAwCKzfB3Oz70SWB3VD7ILZ1qwI4hMYFJRb4mUO5Hyc9np9F2IGj7kRXOTwrKynEVWJk00aMnAssKr"
);
const port = 9000;

const app = express();

app.use(express.json());

//dotenv config
require("dotenv").config();

//database connection
require("./utils/database");

require("./model/user/seed");

//routes

app.use("/v1/api/user", userRoute);
app.use("/v1/api/category", categoryRoute);
app.use("/v1/api/product", productRoute);
app.use("/v1/api/order-item", orderRoute);

//payment
app.post("/create-checkout-session", async (req, res) => {
  const orderitems = [
    {
      _id: "123",
      price: 30000,
      quantity: 1,
      name: "Tshirt",
    },
    {
      _id: "133",
      price: 4000,
      quantity: 2,
      name: "pant",
    },
    {
      _id: "143",
      price: 40,
      quantity: 3,
      name: "shoes",
    },
  ];

  const line_items = orderitems.map((item) => {
    return {
      price_data: {
        currency: "npr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    };
  });

  console.log(line_items, "asdasdasd");

  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}?success=true`,
    cancel_url: `${process.env.FRONTEND_URL}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
