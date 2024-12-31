const User = require("../model/userModel");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res
      .status(400)
      .send({ message: "Something went wrong, try another email address" });
  }

  // const user = await User.create({
  //   name,
  //   email,
  //   password,
  // });

  const newUser = new User({ name, email, password });
  await newUser.save();

  res.status(201).send({ message: "User created successfully", data: newUser });
};

const getUser = async (req, res) => {
  const users = await User.find({});
  res.status(200).send({ data: users });
};

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const existingUser = await User.findById(id);

    console.log(existingUser);

    if (!existingUser) {
      return res.status(404).send({ message: "something went wrong" });
    }

    res.status(200).send({ data: existingUser });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const existingUser = await User.findById(id).select("+password");

  console.log(existingUser, "testing");

  if (!existingUser) {
    return res.status(404).send({ message: "User not found" });
  }

  const { name, email, password } = req.body;

  // if (!name || !email || !password) {
  //   return res.status(400).send({ message: "All fields are required" });
  // }

  // const updateUser = await User.findByIdAndUpdate(
  //   id,
  //   {
  //     name,
  //     email,
  //     password,
  //   },
  //   {
  //     new: true,
  //   }
  // );

  existingUser.name = name;
  existingUser.email = email;
  existingUser.password = password;

  await existingUser.save();
  res
    .status(200)
    .send({ message: "User updated successfully", data: existingUser });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const existingUser = await User.findById(id);

  console.log(existingUser);

  if (!existingUser) {
    return res.status(404).send({ message: "Something went wrong" });
  }

  await User.findByIdAndDelete(id);
  res.status(200).send({ message: "User deleted successfully" });
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getSingleUser,
};
