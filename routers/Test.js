const express = require("express");
const Test = require("../models/Test");
const testRouter = express.Router();

testRouter.post("/create", async (req, res) => {
  const { name, sdt, gender, age, address } = req.body;

  const newTest = new Test({
    name,
    sdt,
    gender,
    age,
    address,
  });

  try {
    const data = await newTest.save(newTest);

    res.status(200).json(data);
  } catch (error) {
    res.status(203).json(error);
  }
});

testRouter.get("/getData", async (req, res) => {
  try {
    const data = await Test.find();

    res.status(200).json(data);
  } catch (error) {
    res.status(203).json(error);
  }
});

testRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  try {
    const data = await Test.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
    if (data) {
      return res.status(200).json({
        message: "Cập Nhật Thành Công",
      });
    }
    return res.status(201).json({ message: "Cập Nhật Không Thành Công" });
  } catch (error) {
    return res.status(203).json(error);
  }
});

testRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Test.findOneAndDelete({ _id: id });
    if (data) {
      return res.status(200).json({ message: "Xóa Thành Công" });
    }
    return res.status(200).json({ message: "Xóa Không Thành Công" });
  } catch (error) {
    return res.status(200).json(error);
  }
});

module.exports = testRouter;
