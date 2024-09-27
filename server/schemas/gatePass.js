const mongoose = require("mongoose");

const gatePassSchema = new mongoose.Schema(
  {
    userName: String,
    department: String,
    message: String,
    email: String,
    date: {
      type: Date,
    },
    exitTime: Date,
    returnTime: Date,
    hodStatus: {
      type: String,
      default: "pending",
    },
    directorStatus: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const GatePasses = mongoose.model("GatePass", gatePassSchema);
module.exports = GatePasses;
