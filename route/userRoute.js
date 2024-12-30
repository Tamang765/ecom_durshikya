const express = require("express");
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getSingleUser,
} = require("../controller/userController");
const router = express.Router();

router.post("/", createUser);

router.get("/", getUser);
router.patch("/:id", updateUser);
router.get("/:id", getSingleUser);

router.delete("/:id", deleteUser);

module.exports = router;
