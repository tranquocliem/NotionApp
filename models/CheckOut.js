const mongoose = require("mongoose");

const CheckOutSchema = new mongoose.Schema(
  {
    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Devices",
    },
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    typecheckin: {
      type: String,
      required: true,
    },
    datetime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CheckOut", CheckOutSchema);
