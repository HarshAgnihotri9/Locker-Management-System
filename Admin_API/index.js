import express from "express";

// const adminRouter = require("./routes/adminRoutes");
import adminRouter from "../Admin_API/routes/adminRoutes.js";
// const dotenv = require("dotenv");
import dotenv from "dotenv";

const app = express();
// const cors = require("cors");

dotenv.config();

// const mongoose = require("mongoose");
import mongoose from "mongoose";

app.use(express.json());

// app.use(cors());

app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Tests API From Gaurav");
});

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL)
  // mongoose.connect(process.env.Cluster_URL)
  .then(() => {
    app.listen(port, () => {
      console.log("Server started on port no. " + port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
