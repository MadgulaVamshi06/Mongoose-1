const express = require("express");
const UserModel = require("../model/user.model");
const userRouter = express.Router();


userRouter.get("/getusers", async (req, res) => {
    try {
      const filter = req.query;
      const user = await UserModel.find(filter);
      res.status(200).send(user);
    } catch (error) {
      console.log("Data not found", error);
    }
  });
  
  userRouter.post("/getusers", async (req, res) => {
    const { name, email, password } = req.body;
  
    const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      
    const user = new UserModel({
      name,
      email,
      password,
    });
    await user.save();
    res.send(user);
  });
  
  userRouter.patch("/updateuser/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedUser = await UserModel.findByIdAndUpdate({ _id: id }, data);
      res.status(200).send("filed updated");
    } catch (error) {
      console.log("Data not found", error);
    }
  });
  
  userRouter.delete("/deleteuser/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await UserModel.findByIdAndDelete({ _id: id });
      res.status(200).send("user deleted");
    } catch (error) {
      console.log("Data not found", error);
    }
  });

  module.exports = userRouter;