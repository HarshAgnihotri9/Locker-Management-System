const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const { feacher } = require("../backend/data/data1.js");
dotenv.config();
const router = require("../backend/Routes/UserRouter.js");
const adminRouter = require("../backend/Routes/AdminRoute.js");

const app = express();
app.use(express.json());
// app.use(cookieParser);
app.use(cors());
app.use("/api/user", router);
app.use("/api/Admin", adminRouter);

app.get("/", (req, res) => {
  res.send("hiii everyone");
});

// const mongoose = require('mongoose');

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log("connected succesfully");
      console.log("Server started on port no. " + port);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// app.listen(process.env.PORT);
