const express = require("express");
const passport = require("passport");
const CheckOut = require("../models/CheckOut");
const checkOutRouter = express.Router();
const wifi = require("node-wifi");
const Wifi = require("../models/Wifi");
const Devices = require("../models/Devices");
const address = require("address");
let spawn = require("child_process").spawn;

wifi.init({
  iface: null,
});

// create check out
checkOutRouter.post(
  "/createCheckOut",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.user;

    //get mac
    function getmac() {
      var mac;
      address.mac(function (err, m) {
        mac = m;
      });

      return mac;
    }

    function wifiNetworksRSSI(fn) {
      // prepare result string of data
      var res = "";
      // spawn netsh with required settings
      var netsh = spawn("netsh", ["wlan", "show", "networks", "mode=bssid"]);

      // get data and append to main result
      netsh.stdout.on("data", function (data) {
        res += data;
      });

      // if error occurs
      netsh.stderr.on("data", function (data) {
        console.log("stderr: " + data);
      });

      // when done
      netsh.on("close", function (code) {
        if (code == 0) {
          // normal exit
          // prepare array for formatted data
          var networks = [];
          // split response to blocks based on double new line
          var raw = res.split("\r\n\r\n");

          // iterate through each block
          for (var i = 0; i < raw.length; ++i) {
            // prepare object for data
            var network = {};

            // parse SSID
            var match = raw[i].match(/^SSID [0-9]+ : (.+)/);
            if (match && match.length == 2) {
              network.ssid = match[1];
            } else {
              network.ssid = "";
            }

            // if SSID parsed
            if (network.ssid) {
              // parse BSSID
              var match = raw[i].match(" +BSSID [0-9]+ +: (.+)");
              if (match && match.length == 2) {
                network.bssid = match[1];
              } else {
                network.bssid = "";
              }

              // parse RSSI (Signal Strength)
              var match = raw[i].match(" +Signal +: ([0-9]+)%");
              if (match && match.length == 2) {
                network.rssi = parseInt(match[1]);
              } else {
                network.rssi = NaN;
              }

              // push to list of networks
              networks.push(network);
            }
          }

          // callback with networks and raw data
          fn(null, networks, res);
        } else {
          // if exit was not normal, then throw error
          fn(new Error(code));
        }
      });
    }

    try {
      let today = new Date();
      const dataWifi = await Wifi.find();
      wifiNetworksRSSI(async function (err, wifiCurrent, raw) {
        if (!err) {
          const myMac = await Devices.findOne({ writer: id });
          const macCurrent = getmac();

          if (!myMac) {
            return res.status(203).json({
              message: "Bạn Chưa Đăng Ký Thiết Bị Trên Hệ Thống",
              status: false,
            });
          }

          if (
            dataWifi[0].ssid === wifiCurrent[0].ssid &&
            myMac.mac === macCurrent
          ) {
            const newCheckOut = new CheckOut({
              writer: id,
              device: myMac._id,
              typecheckin: "Trực Tiếp",
              datetime: today.toLocaleString("en-UK"),
            });
            const data = await newCheckOut.save(newCheckOut);
            if (data) {
              return res.status(200).json({
                message: "Check Out Thành Công Tại Công Ty",
                status: true,
              });
            } else {
              return res.status(400).json({
                message: "Check Out Không Thành Công Tại Công Ty",
                status: false,
              });
            }
          }

          if (dataWifi[0].ssid !== wifiCurrent[0].ssid) {
            const newCheckOut = new CheckOut({
              writer: id,
              device: myMac._id,
              typecheckin: "WFH",
              datetime: today.toLocaleString("en-UK"),
            });
            const data = await newCheckOut.save(newCheckOut);
            if (data) {
              return res.status(200).json({
                message: "Check Out Thành Công Tại Nhà (WFH)",
                status: true,
              });
            } else {
              return res.status(400).json({
                message: "Check Out Không Thành Công Tại Nhà (WFH)",
                status: false,
              });
            }
          }

          if (
            dataWifi[0].ssid === wifiCurrent[0].ssid &&
            myMac.mac !== macCurrent
          ) {
            return res.status(203).json({
              message: "Check Out Không Thành Công",
              status: false,
            });
          }

          if (
            dataWifi[0].ssid !== wifiCurrent[0].ssid &&
            myMac.mac !== macCurrent
          ) {
            return res.status(203).json({
              message: "Check Out Không Thành Công",
              status: false,
            });
          }
        } else {
          console.log(err);
        }
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

//load all checkin
checkOutRouter.get(
  "/getCheckOuts",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { role } = req.user;
    if (role === "spadmin" || role === "admin") {
      try {
        const dataCheckouts = await CheckOut.find()
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
checkOutRouter.get(
  "/getMyCheckout",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const writer = req.user.id;

    try {
      const dataCheckin = await CheckOut.find({ writer });

      return res.status(200).json(dataCheckin);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

//load checkout by id
checkOutRouter.get(
  "/getCheckOutByID/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const { role } = req.user;
    if (role === "spadmin" || role === "admin") {
      try {
        const dataCheckOut = await CheckOut.find({ writer: id }).populate({
          path: "writer",
          select: "-password",
        });
        if (dataCheckOut) {
          return res.status(200).json({ dataCheckOut, status: true });
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
checkOutRouter.patch(
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
checkOutRouter.delete(
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
checkOutRouter.get(
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

module.exports = checkOutRouter;
