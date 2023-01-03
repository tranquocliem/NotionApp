const express = require("express");
const passport = require("passport");
const CheckIn = require("../models/CheckIn");
const checkInRouter = express.Router();

// create check in
checkInRouter.post(
  "/createCheckIn",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.user;

    const { latitude, longitude } = req.body;

    try {
      let vietname_datetime_str = new Date().toLocaleString("en-UK", {
        timeZone: "Asia/Ho_Chi_Minh",
        hour12: true,
      });

      const newCheckIn = new CheckIn({
        writer: id,
        typecheckin: "Đã Check In",
        latitude,
        longitude,
        datetime: vietname_datetime_str,
      });
      const data = await newCheckIn.save(newCheckIn);
      if (data) {
        return res.status(200).json({
          message: "Check In Thành Công",
          status: true,
        });
      } else {
        return res.status(400).json({
          message: "Check In Không Thành Công",
          status: false,
        });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

//load all checkin
checkInRouter.get(
  "/getCheckIns",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { role } = req.user;
    if (role === "spadmin" || role === "admin") {
      try {
        const dataCheckins = await CheckIn.find()
          .populate({
            path: "writer",
            select: "-password",
          })
          .populate({
            path: "device",
          })
          .sort({ name: 1 });

        return res.status(200).json(dataCheckins);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
  }
);

// load my checkin
checkInRouter.get(
  "/getMyCheckin",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const writer = req.user.id;

    try {
      const dataCheckin = await CheckIn.find({ writer });

      return res.status(200).json(dataCheckin);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

//load Department by id
checkInRouter.get(
  "/getDepartmentByID/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    try {
      const dataDepartment = await Department.findById(id);

      return res.status(200).json(dataDepartment);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

//load checkin by user
checkInRouter.get(
  "/getCheckInByUser/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const { role } = req.user;
    if (role === "spadmin" || role === "admin") {
      try {
        const dataCheckIn = await CheckIn.find({ writer: id }).populate({
          path: "writer",
          select: "-password",
        });
        if (dataCheckIn) {
          return res.status(200).json({ dataCheckIn, status: true });
        } else {
          return res
            .status(203)
            .json({ message: "Không có dữ liệu", status: false });
        }
      } catch (error) {
        return res.status(500).json(error);
      }
    } else {
      return res
        .status(400)
        .json({ message: "Không phận sự đi chỗ khác dùm", status: false });
    }
  }
);

// update Department by user
checkInRouter.patch(
  "/updateDepartment/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    const { role } = req.user;

    const update = {
      name,
    };
    if (role === "spadmin" || role === "admin") {
      try {
        const data = await Department.findOneAndUpdate({ _id: id }, update, {
          new: true,
        });
        if (data) {
          return res.status(200).json({
            message: "Cập Nhật Bộ Phận Thành Công",
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
        status: false,
      });
    }
  }
);

// delete Department by user
checkInRouter.delete(
  "/deleteDepartment/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const { role } = req.user;
    if (role === "spadmin" || role === "admin") {
      try {
        const data = await Department.findOneAndDelete({
          _id: id,
        });
        if (data) {
          return res.status(200).json({
            message: "Xóa Bộ Phận Thành Công",
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
        status: false,
      });
    }
  }
);

// search Department
checkInRouter.get(
  "/searchDepartment",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const departs = await Department.find({
        $text: { $search: `/${req.query.name}/` },
      }).populate({
        path: "writer",
        select: "-password",
      });
      res.status(200).json({ departs });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

module.exports = checkInRouter;
