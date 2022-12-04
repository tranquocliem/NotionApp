const express = require("express");
const accRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../configs/passport");
const JWT = require("jsonwebtoken");
const Account = require("../models/Account");
const bcrypt = require("bcrypt");
const lodash = require("lodash");
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const NodeRSA = require("node-rsa");
const fs = require("fs");
const path = require("path");

//add account
accRouter.post(
  "/addAccount",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { email, username, password, role } = req.body;
    const roleAcc = req.user.role;
    if (roleAcc === "spadmin") {
      try {
        const checkAccount = await Account.findOne({
          $or: [{ username, email }],
        });
        if (checkAccount) {
          return res.status(201).json({
            message: {
              msgBody: "Username hoặc email đã tồn tại",
              msgError: true,
            },
          });
        } else {
          const newAccount = new Account({ email, username, password, role });
          try {
            const data = await newAccount.save(newAccount);
            if (data) {
              return res.status(200).json({
                message: "Tạo Tài Khoản Thành Công",
                status: true,
              });
            }
            return res.status(203).json({
              message: "Tạo Tài Khoản Không Thành Công",
              status: false,
            });
          } catch (error) {
            if (error.code === 11000) {
              return res.status(203).json({
                message: {
                  msgBody: "Username hoặc email đã tồn tại",
                  msgError: true,
                },
                error,
              });
            }
            return res.status(500).json(error);
          }
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      return res.status(203).json({
        message: "Không Phận Sự, Vui Lòng Đi Chỗ Khác Dùm !!!",
        status: false,
      });
    }
  }
);

// add account by admin
accRouter.post(
  "/addAccountByAdmin",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { email, username, password, role, department, position } = req.body;
    const roleAcc = req.user.role;

    if (roleAcc === "admin") {
      if (role !== "spadmin" && role !== "admin") {
        try {
          const checkAccount = await Account.findOne({
            $or: [{ username, email }],
          });
          if (checkAccount) {
            return res.status(201).json({
              message: {
                msgBody: "Username hoặc email đã tồn tại",
                msgError: true,
              },
            });
          } else {
            const newAccount = new Account({
              email,
              username,
              password,
              role,
              department,
              position,
            });
            try {
              const data = await newAccount.save(newAccount);
              if (data) {
                return res.status(200).json({
                  message: "Tạo Tài Khoản Thành Công",
                  status: true,
                });
              }
              return res.status(203).json({
                message: "Tạo Tài Khoản Không Thành Công",
                status: false,
              });
            } catch (error) {
              if (error.code === 11000) {
                return res.status(203).json({
                  message: {
                    msgBody: "Username hoặc email đã tồn tại",
                    msgError: true,
                  },
                  error,
                });
              }
              return res.status(500).json(error);
            }
          }
        } catch (error) {
          return res.status(500).json(error);
        }
      } else {
        return res.status(203).json({
          message: "Bạn Không Được Phép Thêm Loại Tài Khoản Này",
          status: false,
        });
      }
    } else {
      return res.status(203).json({
        message: "Không Có Phận Sự, Vui Lòng Đi Chỗ Khác Dùm Nhé !!!",
      });
    }
  }
);

// get my account
accRouter.get(
  "/getMyAccount",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.user;
    try {
      const dataUser = await Account.findOne({ _id: id }, { password: 0 });
      return res.status(200).json({ dataUser, status: true });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

//get all account
accRouter.get(
  "/getAccount",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const roleAcc = req.user.role;
    if (roleAcc === "spadmin") {
      try {
        const dataUser = await Account.find({}, { password: 0 });
        return res.status(200).json({ dataUser, status: true });
      } catch (error) {
        return res.status(500).json(error);
      }
    } else {
      return res.status(203).json({
        message: "Không Phận Sự, Vui Lòng Đi Chỗ Khác Dùm !!!",
        status: false,
      });
    }
  }
);

//get account by admin
accRouter.get(
  "/getAccountByAdmin",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const roleAcc = req.user.role;
    if (roleAcc !== "spadmin") {
      try {
        const dataUser = await Account.find(
          {
            $or: [{ role: "member" }, { role: "leader" }],
          },
          { password: 0 }
        );
        return res.status(200).json({ dataUser, status: true });
      } catch (error) {
        return res.status(500).json(error);
      }
    } else {
      return res.status(203).json({
        message: "Không Phận Sự, Vui Lòng Đi Chỗ Khác Dùm !!!",
        status: false,
      });
    }
  }
);

// update my account
accRouter.patch(
  "/updateAccount",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const update = req.body;
    const { id } = req.user;
    try {
      const user = await Account.findOneAndUpdate({ _id: id }, update, {
        new: true,
      });
      if (user) {
        return res.status(200).json({
          message: "Cập Nhật Thông Tin Thành Công",
          status: true,
        });
      }
      return res.status(203).json({
        message: "Tài Khoản Không Hợp Lệ Hoặc Dữ Liệu Không Tồn Tại",
        status: false,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

// delete Department by user
accRouter.delete(
  "/deleteAccount/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const { role } = req.user;
    if (role === "spadmin") {
      try {
        const data = await Account.findOneAndDelete({
          _id: id,
        });
        if (data) {
          return res.status(200).json({
            message: "Xóa Tài Khoản Thành Công",
            status: true,
          });
        }
        return res.status(203).json({
          message: "Tài Khoản Không Hợp Lệ Hoặc Dữ Liệu Không Tồn Tại",
          status: false,
        });
      } catch (error) {
        return res.status(500).json(error);
      }
    } else {
      return res.status(203).json({
        message: "Không phận sự, vui lòng đi chỗ khác dùm !!!",
      });
    }
  }
);

//login
const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "QuocLiem",
      sub: userID,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );
};

accRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username } = req.user;
      let token = signToken(_id);
      public_key = fs.readFileSync(
        path.resolve(__dirname, "../configs/publickey.key")
      );
      let key_public = new NodeRSA(public_key);
      let end = key_public.encrypt(token, process.env.PUBLIC_KEY);
      token = end;
      res.cookie("temp", token, {
        httpOnly: true,
        sameSite: true,
      });
      res.status(200).json({ isAuthenticated: true, user: { _id, username } });
    }
  }
);

//logout
accRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("temp");
    res.json({ user: { username: "" }, success: true });
  }
);

//đổi mật khẩu tài khoản
accRouter.post(
  "/changePass",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { old_Password, password, configPassword } = req.body;
    const { username, email } = req.user;
    Account.findOne(
      { $or: [{ username: username }, { email: email }] },
      (err, user) => {
        if (err || !user) {
          return res.status(500).json({
            message: {
              msgBody: "Lỗi hoặc tài khoản không tồn tại",
              msgError: true,
            },
            err,
          });
        }
        if (password !== configPassword) {
          return res.status(400).json({
            message: {
              msgBody: "Mật khẩu xác nhận không đúng",
              msgError: true,
            },
          });
        }
        //cần nhập pass củ và so sánh với pass với csdl
        // bcrypt.compare(
        //   old_Password,
        //   req.user.password,
        //   function (err, isMatch) {
        //     console.log(err);
        //   }
        // );
        bcrypt.compare(
          old_Password,
          req.user.password,
          function (err, isMatch) {
            if (err) {
              res.status(400).json({
                message: {
                  msgBody: "Có Lỗi!!!",
                  msgError: true,
                },
                err,
              });
            }
            if (!isMatch) {
              res.status(400).json({
                isMatch: isMatch,
                message: {
                  msgBody: "Mật khẩu cũ không đúng",
                  msgError: true,
                },
              });
            } else {
              const updatePassword = {
                password: password,
              };
              user = lodash.extend(user, updatePassword);
              user.save((err, result) => {
                if (err) {
                  return res.status(500).json({
                    message: {
                      msgBody: "Lỗi thêm không thành công",
                      msgError: true,
                    },
                    err,
                  });
                }
                res.status(200).json({
                  message: {
                    msgBody: "Thay Đổi Mật Khẩu Thành Công",
                    msgError: false,
                  },
                });
              });
            }
          }
        );
      }
    );
  }
);

//tài khoản đang hiện hành
accRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { _id, username, role } = req.user;
    res.status(200).json({
      isAuthenticated: true,
      user: {
        _id,
        username,
        role,
      },
    });
  }
);

module.exports = accRouter;
