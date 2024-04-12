const express = require("express");
const { auth } = require("../middleware/Auth");
const {
  signUpUser,
  loginuser,
  profileDetails,
  updateProfile,
  logoutUser,
} = require("../Controller/UserController");

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", loginuser);
router.get("/profile", auth, profileDetails);
router.put("/updateProfile/:id", updateProfile);
router.get("/logout", logoutUser);

module.exports = router;
