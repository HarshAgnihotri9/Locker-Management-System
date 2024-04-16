// const mongoose = require("mongoose");
import mongoose from "mongoose";
mongoose.set("strictQuery", true);

const RequestSchema = mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },
    Requ: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Request", RequestSchema);
