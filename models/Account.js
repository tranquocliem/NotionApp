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
  },
  { timestamps: true }
);

//mã hoá mật khẩu khi lưu vào csdl
AccountSchema.pre("save", function (next) {
  //đã được mã hoá rồi thì ko làm gì
  if (!this.isModified("password")) return next();
  //chưa mã hoá
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);
    //ghi đè mật khẩu củ bằng mật khẩu mới
    this.password = passwordHash;
    next();
  });
});

//viết hàm so sánh mật khẩu từ người nhập và mật khẩu mã hoá trong CSDL
AccountSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    else {
      //không giống nhau
      if (!isMatch) return cb(null, isMatch);
      return cb(null, this);
    }
  });
};

module.exports = mongoose.model("Account", AccountSchema);
