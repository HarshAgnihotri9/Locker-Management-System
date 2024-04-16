// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
// require('dotenv').config();
import dotenv from "dotenv";
dotenv.config();

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
    } else {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized User" });
  }
};

// module.exports = auth;
export default auth;
