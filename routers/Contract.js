const express = require("express");
const passport = require("passport");
const Account = require("../models/Account");
const Contract = require("../models/Contract");
const contractRouter = express.Router();

// create Contract
contractRouter.post(
  "/createContract",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { typeContract, startDate, endDate, user } = req.body;
    const { id, role } = req.user;

    const newContract = new Contract({
      typeContract,
      startDate,
      endDate,
      writer: id,
      user,
    });

    if (role === "spadmin" || role === "admin") {
      try {
        const data = await newContract.save(newContract);

        if (data) {
          const idContract = data._id;
          await Account.findOneAndUpdate(
            { _id: user },
            { contract: idContract }
          );
          return res.status(200).json({
            message: "Tạo Hợp Đồng Thành Công",
            status: true,
          });
        }
        return res
          .status(200)
          .json({ message: "Tạo Hợp Đồng Không Thành Công", status: false });
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

//load Contract
contractRouter.get(
  "/getContract",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const dataContract = await Contract.find()
        .populate({
          path: "user",
        })
        .populate({
          path: "writer",
        })
        .sort({ name: 1 });

      return res.status(200).json(dataContract);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

//load Contract by id
contractRouter.get(
  "/getContractByID/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    try {
      const dataContract = await Contract.findById(id);

      return res.status(200).json(dataContract);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

// load Contract by user
contractRouter.get(
  "/getContractByUser/:user",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { user } = req.params;

    try {
      const dataContract = await Contract.findOne({ user });

      return res.status(200).json(dataContract);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

// update Contract by user
contractRouter.patch(
  "/updateContract/:id",
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

// delete Contract by user
contractRouter.delete(
  "/deleteContract/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const { role } = req.user;
    if (role === "spadmin" || role === "admin") {
      try {
        const data = await Contract.findOneAndDelete({
          _id: id,
        });
        if (data) {
          const idUser = data.user;
          await Account.findOneAndUpdate({ _id: idUser }, { contract: null });
          return res.status(200).json({
            message: "Xóa Hợp Đồng Thành Công",
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

// search Contract
contractRouter.get(
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

module.exports = contractRouter;
