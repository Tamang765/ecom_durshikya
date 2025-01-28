const User = require("../../model/user/userModal");
const bcrypt = require("bcryptjs");

const jsonwebtoken = require("jsonwebtoken");
const { sendWelcomeEmail } = require("../../utils/mailer");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password || !phone || !address) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(400)
        .send({ message: "Something went wrong, try another email address" });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
    });

    await sendWelcomeEmail(email, name);
    res.status(201).send({ message: "User registered successfully", user });
  } catch (error) {
    throw new Error(error);
  }
};

const loginUser = async (req, res) => {
  try {
    console.log(req.body, "this is bpody");
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const userExist = await User.findOne({ email }).select("+password");

    if (!userExist) {
      return res.status(400).send({ message: "Something went wrong" });
    }

    const passwordMatch = await bcrypt.compare(password, userExist.password);

    if (!passwordMatch) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const token = await jsonwebtoken.sign(
      { id: userExist?._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).send({
      message: "Login successful",
      data: {
        user: userExist,
        token,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};


const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ data: users });
  } catch (error) {
    console.log(error.message);
  }
};
const getMe = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send({ data: user });
  } catch (error) {
    console.log(error.message);
  }
};

const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldpassword, password } = req.body;
    //check user
    const userExist = await User.findById({ _id: id }).select("+password");

    if (!userExist) {
      return res.status(400).send({ message: "User Not Found" });
    }
    const passwordMatch = await bcrypt.compare(oldpassword, userExist.password);

    if (!passwordMatch) {
      return res.status(400).send({ message: "Password didn't match" });
    }

    const genSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, genSalt);

    await User.findByIdAndUpdate(id, {
      password: hashPassword,
    });
    res.status(200).send({ message: "User Successfully Updated " });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { registerUser, loginUser, getMe, changePassword,getUsers };
