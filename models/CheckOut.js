const mongoose = require("mongoose");

const CheckOutSchema = new mongoose.Schema(
  {
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    typecheckout: {
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
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CheckOut", CheckOutSchema);
