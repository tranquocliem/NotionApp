const express = require("express");
const accRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../configs/passport");
const JWT = require("jsonwebtoken");
const Account = require("../models/Account");
const Department = require("../models/Department");
const bcrypt = require("bcrypt");
const lodash = require("lodash");
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const NodeRSA = require("node-rsa");
const fs = require("fs");
const path = require("path");
const Multer = require("../configs/Multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//add account
// accRouter.post("/addAccountTest", async (req, res) => {
//   const newAccount = new Account(req.body);
//   try {
//     const data = await newAccount.save(newAccount);
//     if (data) {
//       return res.status(200).json({
//         message: "Tạo Tài Khoản Thành Công",
//         status: true,
//       });
//     }
//     return res.status(203).json({
//       message: "Tạo Tài Khoản Không Thành Công",
//       status: false,
//     });
//   } catch (error) {
//     if (error.code === 11000) {
//       return res.status(203).json({
//         message: "Username hoặc email đã tồn tại",
//         status: false,
//         error,
//       });
//     }
//     return res.status(500).json(error);
//   }
// });

//add account
accRouter.post(
  "/addAccount",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { email, username, manv, password, role, department, position } =
      req.body;
    const roleAcc = req.user.role;
    if (roleAcc === "spadmin") {
      try {
        const checkAccount = await Account.findOne({
          $or: [{ username, email, manv }],
        });
        const checkMANVAccount = await Account.findOne({
          manv,
        });
        if (checkAccount && checkMANVAccount) {
          return res.status(201).json({
            message: "Username, email hoặc mã nhân viên đã tồn tại",
            status: false,
          });
        } else {
          const newAccount = new Account(req.body);
          try {
            const data = await newAccount.save(newAccount);
            if (data) {
              const idUser = data._id;
              await Department.findOneAndUpdate(
                { _id: department },
                { $push: { users: idUser } }
              );
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
                message: "Username, email hoặc mã nhân viên đã tồn tại",
                status: false,
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
    const {
      email,
      username,
      fullname,
      manv,
      password,
      role,
      department,
      position,
    } = req.body;
    const roleAcc = req.user.role;

    if (roleAcc === "admin") {
      if (role !== "spadmin" && role !== "admin") {
        try {
          const checkAccount = await Account.findOne({
            $or: [{ username, email, manv }],
          });
          if (checkAccount) {
            return res.status(201).json({
              message: "Username, email, mã nhân viên đã tồn tại",
              status: false,
            });
          } else {
            const newAccount = new Account({
              email,
              username,
              fullname,
              manv,
              password,
              role,
              department,
              position,
            });
            try {
              const data = await newAccount.save(newAccount);
              if (data) {
                const idUser = data._id;
                await Department.findOneAndUpdate(
                  { _id: department },
                  { $push: { users: idUser } }
                );
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
                  message: "Username hoặc email đã tồn tại",
                  status: false,
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
      const dataUser = await Account.findOne({ _id: id }, { password: 0 })
        .populate({ path: "department", model: "Department" })
        .populate({
          path: "contract",
        });
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
    try {
      const dataUser = await Account.find({}, { password: 0 }).populate({
        path: "department",
      });
      return res.status(200).json({ dataUser, status: true });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

//get account by id
accRouter.get(
  "/getAccountById/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    try {
      const dataUser = await Account.findById({ _id: id }, { password: 0 })
        .populate({
          path: "department",
        })
        .populate({
          path: "contract",
        });
      return res.status(200).json({ dataUser, status: true });
    } catch (error) {
      return res.status(500).json(error);
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

//update all account by spadmin
accRouter.patch(
  "/updateAllAccount",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const updateSPAdmin = req.body;

    const { role } = req.user;
    if (role === "spadmin") {
      console.log(updateSPAdmin);
      try {
        const user = await Account.updateMany({}, { $set: { updateSPAdmin } });
        if (user) {
          return res.status(200).json({
            message: "Cập Nhật Thông Tin Thành Công",
            status: true,
          });
        }
      } catch (error) {
        return res.status(500).json(error);
      }
    } else {
      return res.status(203).json({
        message: "Không phận sự, vui lòng đi chỗ khác dùm!!!",
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
    const {
      fullname,
      sdt,
      walletonus,
      avatar,
      birthday,
      address1,
      address2,
      cccd,
      nationality,
      ethnic,
      bankaddress,
    } = req.body;
    const update = {
      fullname,
      sdt,
      walletonus,
      avatar,
      birthday,
      address1,
      address2,
      cccd,
      nationality,
      ethnic,
      bankaddress,
    };
    const updateSPAdmin = req.body;
    const { id, role } = req.user;
    if (role === "spadmin") {
      try {
        const user = await Account.findOneAndUpdate(
          { _id: id },
          updateSPAdmin,
          {
            new: true,
          }
        );
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

// update account by spadmin
accRouter.patch(
  "/updateAccountBySpAdmin/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const updateSPAdmin = req.body;
    // const { department } = req.body;

    const { role } = req.user;
    const { id } = req.params;
    if (role === "spadmin") {
      try {
        const data = await Account.findById({
          _id: id,
        });

        const user = await Account.findOneAndUpdate(
          { _id: id },
          updateSPAdmin,
          {
            new: true,
          }
        );

        const oldDepartment = data.department;

        if (user) {
          if (updateSPAdmin.department && oldDepartment) {
            if (oldDepartment !== updateSPAdmin.department) {
              await Department.findOneAndUpdate(
                { _id: oldDepartment },
                { $pull: { users: id } }
              );
              await Department.findOneAndUpdate(
                { _id: updateSPAdmin.department },
                { $push: { users: id } }
              );
            }
          }
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
    } else {
      return res.status(203).json({
        message: "Không phận sự, vui lòng đi chỗ khác dùm!!!",
        status: false,
      });
    }
  }
);

// update account by admin
accRouter.patch(
  "/updateAccountByAdmin/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { department, position } = req.body;
    const { role } = req.user;
    const { id } = req.params;
    // const { department } = req.body;
    const updates = {
      department,
      position,
    };

    const data = await Account.findById({
      _id: id,
    });

    console.log(data.role);

    if (role === "admin" && data.role !== "spadmin" && data.role !== "admin") {
      try {
        const user = await Account.findOneAndUpdate({ _id: id }, updates, {
          new: true,
        });

        const oldDepartment = data.department;

        if (user) {
          if (updates.department && oldDepartment) {
            if (oldDepartment !== updates.department) {
              await Department.findOneAndUpdate(
                { _id: oldDepartment },
                { $pull: { users: id } }
              );
              await Department.findOneAndUpdate(
                { _id: updates.department },
                { $push: { users: id } }
              );
            }
          }
          if (updates.department && !oldDepartment) {
            await Department.findOneAndUpdate(
              { _id: updates.department },
              { $push: { users: id } }
            );
          }
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
    } else {
      return res.status(203).json({
        message: "Không phận sự, vui lòng đi chỗ khác dùm!!!",
        status: false,
      });
    }
  }
);

// Upload Image Avatar To Cloud
accRouter.post(
  "/uploadImage",
  passport.authenticate("jwt", { session: false }),
  Multer.array("file"),
  async (req, res) => {
    try {
      let arrImages = [];
      const files = req.files;
      const { id } = req.user;
      const promises = [];
      for (const file of files) {
        const { path } = file;
        promises.push(
          cloudinary.uploader.upload(path, {
            resource_type: "auto",
            public_id: id,
            folder: "TQLApp/",
            overwrite: true,
          })
        );
      }

      const datas = await Promise.all(promises);

      for (const data of datas) {
        arrImages.push({ public_id: id, url: data.secure_url });
      }

      return res.status(200).json({
        success: false,
        message: {
          msgBody: "Upload Ok!",
          msgError: false,
        },
        data: arrImages,
      });
    } catch (error) {
      return res.status(203).json({
        success: false,
        message: {
          msgBody: "Lỗi!!!",
          msgError: true,
        },
        error,
      });
    }
  }
);

//Delete Image Avatar In Cloud
accRouter.delete(
  "/destroyAvatar",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.user;
      if (!id) {
        return res.status(203).json({
          success: false,
          message: {
            msgBody: "Hình ảnh không tồn tại",
            msgError: true,
          },
        });
      }
      cloudinary.uploader.destroy(`TQLApp/${id}`, async (err, result) => {
        if (err) throw err;

        res.status(200).json({
          success: true,
          message: {
            msgBody: "Xoá thành công",
            msgError: false,
          },
          result,
        });
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: {
          msgBody: "Lỗi!!!",
          msgError: true,
        },
        error,
      });
    }
  }
);

// delete account
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
          const idDepartment = data.department;
          await Department.findOneAndUpdate(
            { _id: idDepartment },
            { $pull: { users: id } }
          );
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
      const { _id, username, avatar, fullname } = req.user;
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
      res.status(200).json({
        isAuthenticated: true,
        user: { _id, username, avatar, fullname },
      });
    }
  }
);

//logout
accRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      res.clearCookie("temp");
      res.json({ user: { username: "" }, success: true });
    } catch (error) {
      res.json(error);
    }
  }
);

//đổi mật khẩu tài khoản
accRouter.patch(
  "/changePass",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { old_Password, password, configPassword } = req.body;
    const { id } = req.user;

    try {
      let user = await Account.findById({ _id: id });
      if (user) {
        if (password !== configPassword) {
          return res.status(203).json({
            message: "Mật khẩu xác nhận không đúng",
            status: false,
          });
        }
        bcrypt.compare(
          old_Password,
          req.user.password,
          function (err, isMatch) {
            if (err) {
              res.status(203).json({
                message: "Có Lỗi!!!",
                err,
                status: false,
              });
            }
            if (!isMatch) {
              res.status(203).json({
                isMatch: isMatch,
                message: "Mật khẩu cũ không đúng",
                status: false,
              });
            } else {
              const updatePassword = {
                password: password,
              };
              user = lodash.extend(user, updatePassword);
              user.save((err, result) => {
                if (err) {
                  return res.status(203).json({
                    message: "Lỗi thêm không thành công",
                    status: false,
                    err,
                  });
                }
                res.status(200).json({
                  message: "Thay Đổi Mật Khẩu Thành Công",
                  status: true,
                });
              });
            }
          }
        );
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

//tài khoản đang hiện hành
accRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { _id, username, role, avatar, fullname } = req.user;
    res.status(200).json({
      isAuthenticated: true,
      user: {
        _id,
        username,
        role,
        avatar,
        fullname,
      },
    });
  }
);

module.exports = accRouter;
