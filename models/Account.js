const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AccountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      min: 3,
      max: 25,
    },
    password: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },
    position: {
      type: String,
      default: "",
    },
    fullname: {
      type: String,
      default: "",
    },
    sdt: {
      type: String,
      default: "",
    },
    walletonus: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
    role: {
      type: String,
      enum: ["spadmin", "admin", "leader", "member"],
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    manv: {
      type: String,
      default: "",
      unique: true,
      required: true,
    },
    birthday: {
      type: Date,
      default: "",
    },
    address1: {
      type: String,
      default: "",
    },
    address2: {
      type: String,
      default: "",
    },
    cccd: {
      type: String,
      default: "",
    },
    nationality: {
      type: String,
      default: "",
    },
    ethnic: {
      type: String,
      default: "",
    },
    contract: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contract",
      default: null,
    },
    bankaddress: {
      type: String,
      default: "",
    },
    note: {
      type: String,
      default: "",
    },
    statusMac: {
      type: Boolean,
      required: true,
      default: true,
    },
    contract: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contract",
    },
  },
  { timestamps: true }
);

//m?? ho?? m???t kh???u khi l??u v??o csdl
AccountSchema.pre("save", function (next) {
  //???? ???????c m?? ho?? r???i th?? ko l??m g??
  if (!this.isModified("password")) return next();
  //ch??a m?? ho??
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);
    //ghi ???? m???t kh???u c??? b???ng m???t kh???u m???i
    this.password = passwordHash;
    next();
  });
});

//vi???t h??m so s??nh m???t kh???u t??? ng?????i nh???p v?? m???t kh???u m?? ho?? trong CSDL
AccountSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    else {
      //kh??ng gi???ng nhau
      if (!isMatch) return cb(null, isMatch);
      return cb(null, this);
    }
  });
};

module.exports = mongoose.model("Account", AccountSchema);
