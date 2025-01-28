const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
  changePassword,
  getUsers,
} = require("../controller/user/userController");
const {checkAuth, checkUserAuth} = require("../middleware/checkAuth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("", getUsers);

router.get("/getme",checkUserAuth, getMe);

router.patch("/changepassword/:id", changePassword);

module.exports = router;
