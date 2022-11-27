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

          return res.status(200).json(dataPost);
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

        return res.status(200).json(dataPost);
      }
    } catch (error) {
      return res.status(203).json(error);
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
      return res.status(203).json(error);
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
      return res.status(203).json(error);
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
      return res.status(203).json(error);
    }
  }
);

module.exports = postRouter;
