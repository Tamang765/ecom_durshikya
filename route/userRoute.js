const express = require("express");
const { registerUser } = require("../controller/user/userController");
const router = express.Router();

router.post("/register", registerUser);

module.exports = router;
