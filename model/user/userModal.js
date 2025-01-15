const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
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
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    role: {
      enum: ["user", "admin"],
      type: String,
      default: "user",
    },
  },
  { timeStamps: true }
);

//hash password

userSchema.pre("save", async function (next) {
  const genSalt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(this.password, genSalt);
  this.password = hashPassword;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
