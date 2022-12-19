const mongoose = require("mongoose");

const WifiSchema = new mongoose.Schema({
  ssid: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Wifi", WifiSchema);
