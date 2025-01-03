const express = require("express");
const {
  createUser,
  getUser,
  updateUser,
  getSingleUser,
  logIn,
} = require("../controller/userController");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.post("/", createUser);
router.get("/", checkAuth, getUser);
router.patch("/:id", updateUser);
router.get("/:id", getSingleUser);
router.post("/login", logIn);

module.exports = router;
