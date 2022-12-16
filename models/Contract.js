const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: "",
  },
  endDate: {
    type: Date,
    default: "",
  },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
});

module.exports = mongoose.model("Contract", contractSchema);
