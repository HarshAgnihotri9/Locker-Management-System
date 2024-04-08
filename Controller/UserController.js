// const userModel = require("../models/User");
const userModel = require("../MongoModel/Usermodel.js");
const bcrypt = require("bcrypt");
const { validateEmail } = require("../utils/validation");
const jwt = require("jsonwebtoken");
// const { validatePassword } = require("../utils/passwordvalidate.js");
// const cokie = require("cook");
// const { loggedIn } = require("../Mail/MailAlert.js");
// const express = require("express");
// const app = express();

const signUpUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!validateEmail(email))
      res.status(400).json({ message: "Invalid email address" });

    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // if (validatePassword(password))
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        res.status(400).json({ message: "Problem in encryption" });
      }

      const result = await userModel.create({
        email: email,
        password: hash,
        username: username,
      });
    });
    // const token = jwt.sign(
    //   { username: req.body.username }, //payload
    //   process.env.SECRET_KEY,
    //   { expiresIn: "1m" }
    // );

    res.json({ Message: "Account Creation Done" });

    // res.status(200).json("Account Creation Done", token);

    // res.json(token);

    // res.status(201).json({ error: false, message: "Account creation done" });
  } catch (error) {
    res.status(500).json({ Error: true, Message: error });
  }
};

//login user code

const loginuser = async (req, res) => {
  const { username, password } = req.body;
  // console.log(req.body.password);
  try {
    const existingUser = await userModel.findOne({ username: username });
    if (!existingUser) {
      return res.status(400).json({ message: "User not exists" });
    }
    // const existingUser = await userModel.findOne({ username: username });

    const cheackpassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    console.log(cheackpassword);

    // if (cheackpassword != password) {
    //   res.status(500).json({ Error: true, Message: error });
    // }

    if (!cheackpassword) {
      return res.status(400).json({ message: "Password Incoorect" });
    }
    const token = jwt.sign(
      { username: existingUser.username, id: existingUser._id }, //payload
      process.env.SECRET_KEY,
      { expiresIn: "10m" }
    );

    // console.log(user);

    // loggedIn(existingUser.email);
    res
      // .cookie("token", token)
      .status(200)
      .json({ message: "Logged in sucessfully", token: token, error: false });
  } catch (error) {
    res.status(500).json({ Error: true, Message: error });
  }
};

const profileDetails = async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.username });

    res
      .status(200)
      .json({ message: "Get user profile details", ProfileDetails: user });
  } catch (err) {
    res.status(500).json({ Error: true, Message: err });
  }
};

const updateProfile = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const { username, email, password } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    user = await userModel.findByIdAndUpdate(id, {
      username,
      email,
      password: await bcrypt.hash(password, 10),
      // password: bcrypt.hash(password, 10),
    });
    console.log("error");
    if (!user) {
      return res.status(400).json({ Error: true, Message: "user not exist" });
    }
    // console.log("error2");

    return res.status(200).json({ message: "Update Done" });

    // console.log("error3");
  } catch (err) {
    res.status(400).json({ Error: err });
    // console.log("error4");
  }
};

module.exports = { signUpUser, loginuser, profileDetails, updateProfile };
