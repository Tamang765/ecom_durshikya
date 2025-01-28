const jsonwebtoken = require("jsonwebtoken");
const User = require("../model/user/userModal");

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .send({ message: "Unauthorized Access from middleware" });
    }

    const splitToken = token.split(" ")[1];

    // Verify token

    const decodedToken = await jsonwebtoken.verify(
      splitToken,
      process.env.SECRET_KEY
    );

    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid token" });
    }


    const user = await User.findById({ _id: decodedToken?.id });

    const isAdmin = user.role === "admin";

    if (!isAdmin) {
      return res.status(401).send({ message: "Unauthorized Access" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const checkUserAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .send({ message: "Unauthorized Access from middleware" });
    }

    const splitToken = token.split(" ")[1];

    // Verify token

    const decodedToken = await jsonwebtoken.verify(
      splitToken,
      process.env.SECRET_KEY
    );

    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid token" });
    }


    const user = await User.findById({ _id: decodedToken?.id });


    // if (!isAdmin) {
    //   return res.status(401).send({ message: "Unauthorized Access" });
    // }

    console.log(user, "testing");

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Something went wrong" });
  }
};

module.exports = {checkAuth,checkUserAuth};
