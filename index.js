const express = require("express");
const userRoute = require("./route/userRoute");
const categoryRoute = require("./route/categoryRoute");
const productRoute = require("./route/productRoute");

const port = 9000;

const app = express();

app.use(express.json());

//dotenv config
require("dotenv").config();

//database connection
require("./utils/database");

//routes

app.use("/v1/api/user", userRoute);
app.use("/v1/api/category", categoryRoute);
app.use("/v1/api/product", productRoute);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
