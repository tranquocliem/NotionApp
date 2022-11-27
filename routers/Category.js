const express = require("express");
const passport = require("passport");
const Category = require("../models/Category");
const categoryRouter = express.Router();

categoryRouter.post(
  "/createCategory",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { name } = req.body;
    const writer = req.user._id;

    const newCategory = new Category({
      name,
      writer,
    });

    try {
      const data = await newCategory.save(newCategory);

      return res.status(200).json({
        data,
        message: "Tạo Danh Sách Thành Công",
      });
    } catch (error) {
      return res.json({
        // message: error.message,
        error,
      });
    }
  }
);

//load category
categoryRouter.get(
  "/getCategory",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const dataCategory = await Category.find();

      return res.status(200).json(dataCategory);
    } catch (error) {
      return res.status(203).json(error);
    }
  }
);

//load category by id
categoryRouter.get(
  "/getCategoryByID/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    try {
      const dataCategory = await Category.findById(id);

      return res.status(200).json(dataCategory);
    } catch (error) {
      return res.status(203).json(error);
    }
  }
);

// load category by user
categoryRouter.get(
  "/getCategoryByUser",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const writer = req.user.id;

    try {
      const dataCategory = await Category.find({ writer });

      return res.status(200).json(dataCategory);
    } catch (error) {
      return res.status(203).json(error);
    }
  }
);

// update category by user
categoryRouter.post(
  "/updateCategoryByUser",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id, name } = req.body;

    const update = {
      name,
    };

    const writer = req.user.id;
    try {
      const data = await Category.findOneAndUpdate(
        { _id: id, writer: writer },
        update,
        { new: true }
      );
      if (data === null) {
        return res.status(201).json({
          message: "Tài Khoản Không Hợp Lệ Hoặc Dữ Liệu Không Tồn Tại",
        });
      }
      return res.status(201).json({
        message: "Cập Nhật Thành Công",
      });
    } catch (error) {
      return res.status(203).json(error);
    }
  }
);

// delete category by user
categoryRouter.delete(
  "/deleteCategoryByUser/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const writer = req.user.id;

    try {
      const data = await Category.findOneAndDelete({ _id: id, writer: writer });
      if (data === null) {
        return res.status(201).json({
          message: "Tài Khoản Không Hợp Lệ Hoặc Dữ Liệu Không Tồn Tại",
        });
      }
      return res.status(201).json({
        message: "Xóa Thành Công",
      });
    } catch (error) {
      return res.status(203).json(error);
    }
  }
);

module.exports = categoryRouter;
