const connection = require("./config/db.js");
const express = require("express");
const UserModel = require("./model/user.model.js");
const ProductModel = require("./model/product.model.js");
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send("helloworld");
});


// user model

server.get("/users", async (req, res) => {
  try {
    const filter = req.query;
    const user = await UserModel.find(filter);
    res.status(200).send(user);
  } catch (error) {
    console.log("Data not found", error);
  }
});

server.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  const user = new UserModel({
    name,
    email,
    password,
  });
  await user.save();
  res.send(user);
});

server.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate({ _id: id }, data);
    res.status(200).send("filed updated");
  } catch (error) {
    console.log("Data not found", error);
  }
});

server.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete({ _id: id });
    res.status(200).send("user deleted");
  } catch (error) {
    console.log("Data not found", error);
  }
});

// product model


server.get("/products", async (req, res) => {
  try {
    const filter = req.query;
    const product = await ProductModel.find(filter);
    res.status(200).send(product);
  } catch (error) {
    console.log("Data not found", error);
  }
});

server.post("/products", async (req, res) => {
  const { name, price, description } = req.body;
  const product = new ProductModel({
    name,
    price,
    description,
  });
  await product.save();
  res.send(product);
});

server.patch("/updateproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedProduct = await ProductModel.findByIdAndUpdate({ _id: id }, data);
    res.status(200).send("product updated");
  } catch (error) {
    console.log("Data not found", error);
  }
});

server.delete("/deleteproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await ProductModel.findByIdAndDelete({ _id: id });
    res.status(200).send("product deleted");
  } catch (error) {
    console.log("Data not found", error);
  }
});

server.listen(8000, async (req, res) => {
  try {
    await connection;
    console.log("server is running on 4000 port and connected to mongo db");
  } catch (error) {
    console.log("error", error);
  }
});
