const express = require("express");
const cors = require("cors");
const userRoute = require("./route/userRoute");
const categoryRoute = require("./route/categoryRoute");
const productRoute = require("./route/productRoute");
const orderRoute = require("./route/orderItemRoute");
const ordersRoute = require("./route/orderRoute");

const stripe = require("stripe")(
  "sk_test_51Qh9bq2N6bV3MNFWEa19HAwCKzfB3Oz70SWB3VD7ILZ1qwI4hMYFJRb4mUO5Hyc9np9F2IGj7kRXOTwrKynEVWJk00aMnAssKr"
);

const port = 9000;

const app = express();



app.use(cors());

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
app.use("/v1/api/order", ordersRoute);

//payment
app.post("/create-checkout-session", async (req, res) => {
  try {
    console.log(req.body, "this is body");

    // Map req.body to the required format for Stripe's API
    const formated_data = req.body?.map((item) => {
      return {
        price_data: {
          currency: "npr",
          product_data: {
            name: item?.product?.name, // Access product name
          },
          unit_amount: item?.product?.price * 100, // Access product price and multiply by 100 for Stripe
        },
        quantity: item.quantity, // Get the quantity directly from the item
      };
    });

    console.log(formated_data, "formatted data");

    // Create the Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: formated_data,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}?canceled=true`,
    });

    console.log(session.url,'session')

    // Redirect to the session URL
    // res.redirect(303, session.url);
    res.status(200).send({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send({ error: "Failed to create checkout session" });
  }
});


app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
