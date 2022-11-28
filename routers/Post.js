const express = require("express");
const passport = require("passport");
const Post = require("../models/Post");
const Category = require("../models/Category");
const postRouter = express.Router();

//create bài viết
postRouter.post(
  "/createPost",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { title, contents, idCategory } = req.body;
    const writer = req.user._id;

    try {
      if (idCategory) {
        const dataCategory = await Category.findOne({
          _id: idCategory,
          writer,
        });

        if (dataCategory) {
          const idC = dataCategory._id;
          const newPost = new Post({
            title,
            contents,
            category: idC,
            writer,
          });
          const dataPost = await newPost.save(newPost);
          if (dataPost) {
            return res
              .status(200)
              .json({ message: "Tạo Bài Viết Thành Công", status: true });
          }
          return res
            .status(200)
            .json({ message: "Tạo Bài Viết Không Thành Công", status: false });
        } else {
          return res.status(201).json({
            message: "Danh Sách Không Tồn Tại",
          });
        }
      } else {
        const newPost = new Post({
          title,
          contents,
          writer,
        });
        const dataPost = await newPost.save(newPost);

        if (dataPost) {
          return res
            .status(200)
            .json({ message: "Tạo Bài Viết Thành Công", status: true });
        } else {
          return res
            .status(200)
            .json({ message: "Tạo Bài Viết Không Thành Công", status: false });
        }
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

//load all post
postRouter.get(
  "/getPost",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const dataPost = await Post.find();

      return res.status(200).json(dataPost);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

//load post by id
postRouter.get(
  "/getPostByID/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    try {
      const dataPost = await Post.findById(id);

      return res.status(200).json(dataPost);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

//load post by user
postRouter.get(
  "/getPostByUser",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const writer = req.user.id;
    try {
      const dataPost = await Post.find({ writer });

      return res.status(200).json(dataPost);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

//load post by category
postRouter.get(
  "/getPostByCategory/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const writer = req.user.id;
    try {
      const dataPost = await Post.find({ category: id, writer });

      return res.status(200).json(dataPost);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

// update post
postRouter.patch(
  "/updatePost/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const writer = req.user.id;
    const update = req.body;

    try {
      const dataPost = await Post.findOneAndUpdate(
        { _id: id, writer: writer },
        update,
        { new: true }
      );
      if (dataPost) {
        return res
          .status(200)
          .json({ message: "Cập Nhật Bài Viết Thành Công", status: true });
      }
      return res
        .status(203)
        .json({ message: "Cập Nhật Bài Viết Không Thành Công", status: false });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

// delete post
postRouter.delete(
  "/deletePost/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const writer = req.user.id;
    try {
      const data = await Post.findOneAndDelete({ _id: id, writer: writer });

      if (data) {
        return res.status(200).json({
          message: "Xóa Bài Viết Thành Công",
          status: true,
        });
      }
      return res.status(200).json({
        message: "Xóa Bài Viết Không Thành Công",
        status: false,
      });
    } catch (error) {
      return res.status(200).json(error);
    }
  }
);

module.exports = postRouter;
