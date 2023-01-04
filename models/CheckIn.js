const mongoose = require("mongoose");

const CheckInSchema = new mongoose.Schema(
  {
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    typecheckin: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    datetime: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CheckIn", CheckInSchema);
