const express = require("express");
const passport = require("passport");
const Department = require("../models/Department");
const departmentRouter = express.Router();

// create department
departmentRouter.post(
  "/createDepartment",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { name } = req.body;
    const { id, role } = req.user;

    const newDepartment = new Department({
      name,
      writer: id,
    });

    if (role === "spadmin" || role === "admin") {
      try {
        const data = await newDepartment.save(newDepartment);

        if (data) {
          return res.status(200).json({
            message: "Tạo Bộ Phân Thành Công",
            status: true,
          });
        }
        return res
          .status(200)
          .json({ message: "Tạo Bộ Phận Không Thành Công", status: false });
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

//load Department
departmentRouter.get(
  "/getDepartment",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const dataDepartment = await Department.find()
        .populate({
          path: "writer",
        })
        .sort({ name: 1 });

      return res.status(200).json(dataDepartment);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

//load Department by id
departmentRouter.get(
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

// load Department by user
departmentRouter.get(
  "/getDepartmentByUser",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const writer = req.user.id;

    try {
      const dataDepartment = await Department.find({ writer });

      return res.status(200).json(dataDepartment);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

// update Department by user
departmentRouter.patch(
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
departmentRouter.delete(
  "/deleteDepartment/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const { role } = req.user;
    if ((role === "spadmin", role === "admin")) {
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
departmentRouter.get(
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

module.exports = departmentRouter;
