const User = require("../../model/user/userModal");

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

    res.status(201).send({ message: "User registered successfully", user });
  } catch (error) {}
};

module.exports = { registerUser };
