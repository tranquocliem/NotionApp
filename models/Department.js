const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
});

module.exports = mongoose.model("DepartmentSchema", DepartmentSchema);
