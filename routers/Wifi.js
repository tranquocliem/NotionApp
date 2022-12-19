const express = require("express");
const passport = require("passport");
const Wifi = require("../models/Wifi");
const wifoRouter = express.Router();

// create wifi
wifoRouter.post(
  "/createWifi",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { role } = req.user;
    const { ssid } = req.body;

    const newWifi = new Wifi({
      ssid,
    });

    if (role === "spadmin") {
      try {
        const data = await newWifi.save(newWifi);

        if (data) {
          return res.status(200).json({
            message: "Tạo Wifi Thành Công",
            status: true,
          });
        }
        return res
          .status(200)
          .json({ message: "Tạo Wifi Không Thành Công", status: false });
      } catch (error) {
        return res.status(500).json(error);
      }
    }
  }
);

//load wifi
wifoRouter.get(
  "/getWifi",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { role } = req.user;
    if (role === "spadmin") {
      try {
        const dataWifi = await Wifi.find();

        return res.status(200).json(dataWifi);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
  }
);

// update wifi
wifoRouter.patch(
  "/updateWifi/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { ssid } = req.body;
    const { id } = req.params;
    const { role } = req.user;

    const update = {
      ssid,
    };
    if (role === "spadmin") {
      try {
        const data = await Wifi.findOneAndUpdate({ _id: id }, update, {
          new: true,
        });
        if (data) {
          return res.status(200).json({
            message: "Cập Nhật Wifi Thành Công",
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
wifoRouter.delete(
  "/deleteWifi/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const { role } = req.user;
    if (role === "spadmin") {
      try {
        const data = await Wifi.findOneAndDelete({
          _id: id,
        });
        if (data) {
          return res.status(200).json({
            message: "Xóa Wifi Thành Công",
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

module.exports = wifoRouter;
