const express = require("express");
const { auth } = require("../middleware/Auth");
const {
  signUpUser,
  loginuser,
  profileDetails,
  updateProfile,
} = require("../Controller/UserController");

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", loginuser);
router.get("/profile", auth, profileDetails);
router.put("/updateProfile/:id", updateProfile);

module.exports = router;
