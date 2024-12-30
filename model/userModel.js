const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

//hash password

userSchema.pre("save", async function (next) {

  
  const genSalt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(this.password, genSalt);

  this.password = hashedPassword;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
