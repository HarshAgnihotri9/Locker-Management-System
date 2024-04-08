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

app.get("/api/user/feacher", (req, res) => {
  const feacher = {
    product1: {
      img: "https://i.imgur.com/xdbHo4E.png",
      heading: "Women,bag",
      heading2: "Women leather bag",
      discription:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero,possimus nostrum",
      price: "$970",
    },
    product2: {
      img: "https://i.ibb.co/gD9G8M4/heels.png",
      heading: "Heels",
      heading2: "Women Heels",
      discription:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero,possimus nostrum",
      price: "$350",
    },
    product3: {
      img: "https://i.ibb.co/F0s7cPh/th-removebg-preview.png",
      heading: "Shoes",
      heading2: "Mens Shoes",
      discription:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero,possimus nostrum",
      price: "$400",
    },
  };
  res.send(feacher);
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
