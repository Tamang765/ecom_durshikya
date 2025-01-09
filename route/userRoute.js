const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
  changePassword,
} = require("../controller/user/userController");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getme", checkAuth, getMe);
router.patch("/changepassword/:id", changePassword);

module.exports = router;
