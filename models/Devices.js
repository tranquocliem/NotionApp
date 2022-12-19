const mongoose = require("mongoose");

const DevicesSchema = new mongoose.Schema({
  mac: {
    type: String,
    required: true,
  },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
});

module.exports = mongoose.model("Devices", DevicesSchema);
