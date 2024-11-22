const mongoose = require("mongoose");
const { cashBookDb } = require("../constant");

const cashBookConn = mongoose.createConnection(cashBookDb);

cashBookConn.on("connected", () => {
  console.log("cashbook database connected");
});

cashBookConn.on("error", (err) => {
  console.log("cashbook database error", err);
});

cashBookConn.on("close", () => {
  console.log("cashbook database closed");
});

module.exports = { cashBookConn };
