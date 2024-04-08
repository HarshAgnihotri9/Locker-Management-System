const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const userModel = require("../MongoModel/Usermodel");
dotenv.config();
const sk = process.env.SECRET_KEY;

const auth = (req, res, next) => {
  // try {
  //   let token = req.headers.authorization;
  //   if (token) {
  //     return jwt.verify(token, sk, function (err, decoded) {
  //       if (err) {
  //         return res.json({
  //           success: false,
  //           message: "Failed to authenticate token.",
  //           error: err,
  //         });
  //       }
  //       req.username = decoded;
  //       return next();
  //     });
  //   }
  // }
  try {
    let token = req.headers.authorization;
    // const updatedata = async () => {
    //   let data = await userModel.find();
    //   console.log(req.body);
    //   let result = await userModel.updateOne(
    //     { _id: req.id },
    //     { $set: { IsLoggedIn: false } }
    //   );
    //   console.log(result);
    // };
    // updatedata();

    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, sk);
      console.log("user   :", user);
      req.username = user.username;
      req.token = token;
    } else {
      res.status(401).json({ message: "Unauthorized User" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: true, message: "Unauthorizedd User" });
  }
};

module.exports = { auth };
