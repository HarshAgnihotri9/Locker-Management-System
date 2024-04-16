// const express = require("express");
import express from "express";
// const { signup, signin, GenerateRequest } = require("../controllers/adminController");
import adminController from "../controllers/adminController.js";
const { signup, signin, GenerateRequest } = adminController;

// const auth = require("../middlewares/auth");
import auth from "../middlewares/auth.js";
const adminRouter = express.Router();

adminRouter.post("/signup", auth, signup);
adminRouter.post("/signin", signin);
adminRouter.post("/requests", GenerateRequest);

// module.exports = adminRouter;
export default adminRouter;
