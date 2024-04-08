const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
    },
    IsLoggedIn: {
      default: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Usersss", userSchema);

module.exports = User;
