const mongoose = require("mongoose");
const { cashBookConn } = require("./cashBookConn");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = cashBookConn.model("user", userSchema, "users");

module.exports = userModel;
