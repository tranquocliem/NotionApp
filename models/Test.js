const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  sdt: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("Test", TestSchema);
