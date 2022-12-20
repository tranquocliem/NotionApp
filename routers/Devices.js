const express = require("express");
const passport = require("passport");
const address = require("address");
const Devices = require("../models/Devices");
const devicesRouter = express.Router();

// create department
devicesRouter.post(
  "/createMac",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.user;

    function getmac() {
      var mac;
      address.mac(function (err, m) {
        mac = m;
      });
      return mac;
    }

    const newDevice = new Devices({
      mac: getmac(),
      writer: id,
    });

    try {
      const divece = await Devices.findOne({ writer: id });
      if (divece) {
        return res.status(203).json({
          message: "Bạn đã tạo thiết bị trên ứng dụng này rồi",
          status: false,
        });
      } else {
        const data = await newDevice.save(newDevice);
        if (data) {
          return res.status(200).json({
            message: "Thêm thiết bị thành công",
            status: true,
          });
        }
        return res
          .status(200)
          .json({ message: "Thêm thiết bị thành công", status: false });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

//load all Devices by spadmin
devicesRouter.get(
  "/getAllDevices",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { role } = req.user;
    if (role === "spadmin") {
      try {
        const dataDevices = await Devices.find().populate({
          path: "writer",
          select: "-password",
        });

        return res.status(200).json(dataDevices);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
  }
);

//load my Devices
devicesRouter.get(
  "/getMyDevices",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.user;
    try {
      const device = await Devices.findOne({ writer: id });
      if (device) {
        return res.status(200).json({
          message: "Bạn Chưa Đăng Ký Thiết Bị Trên Hệ Thống",
          device,
          status: true,
        });
      } else {
        return res.status(200).json({
          message: "Bạn Chưa Đăng Ký Thiết Bị Trên Hệ Thống",
          status: false,
        });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

// // load Department by user
// devicesRouter.get(
//   "/getDepartmentByUser",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     const writer = req.user.id;

//     try {
//       const dataDepartment = await Department.find({ writer });

//       return res.status(200).json(dataDepartment);
//     } catch (error) {
//       return res.status(500).json(error);
//     }
//   }
// );

// // update Department by user
// devicesRouter.patch(
//   "/updateDepartment/:id",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     const { name } = req.body;
//     const { id } = req.params;
//     const { role } = req.user;

//     const update = {
//       name,
//     };
//     if (role === "spadmin" || role === "admin") {
//       try {
//         const data = await Department.findOneAndUpdate({ _id: id }, update, {
//           new: true,
//         });
//         if (data) {
//           return res.status(200).json({
//             message: "Cập Nhật Bộ Phận Thành Công",
//             status: true,
//           });
//         }
//         return res.status(203).json({
//           message: "Tài Khoản Không Hợp Lệ Hoặc Dữ Liệu Không Tồn Tại",
//           status: false,
//         });
//       } catch (error) {
//         return res.status(500).json(error);
//       }
//     } else {
//       return res.status(203).json({
//         message: "Không phận sự, vui lòng đi chỗ khác dùm !!!",
//         status: false,
//       });
//     }
//   }
// );

// // delete Department by user
// devicesRouter.delete(
//   "/deleteDepartment/:id",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     const { id } = req.params;
//     const { role } = req.user;
//     if (role === "spadmin" || role === "admin") {
//       try {
//         const data = await Department.findOneAndDelete({
//           _id: id,
//         });
//         if (data) {
//           return res.status(200).json({
//             message: "Xóa Bộ Phận Thành Công",
//             status: true,
//           });
//         }
//         return res.status(203).json({
//           message: "Tài Khoản Không Hợp Lệ Hoặc Dữ Liệu Không Tồn Tại",
//           status: false,
//         });
//       } catch (error) {
//         return res.status(500).json(error);
//       }
//     } else {
//       return res.status(203).json({
//         message: "Không phận sự, vui lòng đi chỗ khác dùm !!!",
//         status: false,
//       });
//     }
//   }
// );

module.exports = devicesRouter;
