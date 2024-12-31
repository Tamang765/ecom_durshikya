const express = require("express");
const app = express();
const port = 8000;
const userRoute = require("./route/userRoute");
const productRoute = require("./route/productRoute");

app.use(express.json());

require("dotenv").config();

require("./utils/database");

// app.patch("/about", (req, res) => {
//   res.send(200, "Welcome");
// });
// app.get("/about", (req, res) => {
//   res.send(200, "Welcome");
// });

// app.post("/about", (req, res) => {
//   res.send(200, "Welcome");
// });

// app.get("/contact", (req, res) => {
//   res.send(200, "Welcome to contact page");
// });

app.use("/user", userRoute);


app.use("/product", productRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
