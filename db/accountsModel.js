const mongoose = require("mongoose");
const { cashBookConn } = require("./cashBookConn");

//创建schema
const accountsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  type: {
    type: Number,
    required: true,
    enum: [0, 1], //0:支出  1：收入
  },
  amount: {
    type: Number,
    required: true,
  },
  remark: {
    type: String,
  },
  uid: {
    type: String,
    required: true,
    index: true, //建立索引
  },
  username: {
    type: String,
    required: true,
  },
});

const accountsModel = cashBookConn.model(
  "accounts",
  accountsSchema,
  "accounts"
);

module.exports = { accountsModel };
