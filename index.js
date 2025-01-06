const express = require("express");
const userRoute = require("./route/userRoute");
const port = 8000;

const app = express();

app.use(express.json());

//dotenv config
require("dotenv").config();

//database connection
require("./utils/database");

app.use("/", (req, res) => {
  res.send("hello");
});

//routes
app.use("/v1/api/user", userRoute);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
