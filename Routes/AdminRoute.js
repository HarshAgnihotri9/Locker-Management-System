const express = require("express");

const { Adminauth } = require("../middleware/adminAuth");
const {
  AdminDetails,
  signUpAdmin,
  loginAdmin,
} = require("../Controller/AdminControler");
const adminRouter = express.Router();

adminRouter.post("/signup", signUpAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.get("/userDetail", Adminauth, AdminDetails);

module.exports = adminRouter;
