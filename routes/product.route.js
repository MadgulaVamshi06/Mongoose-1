const express = require("express");
const ProductModel = require("../model/product.model");
const productRouter = express.Router();

productRouter.get("/getproducts", async (req, res) => {
    try {
      const filter = req.query;
      const product = await ProductModel.find(filter);
      res.status(200).send(product);
    } catch (error) {
      console.log("Data not found", error);
    }
  });
  
  productRouter.post("/getproducts", async (req, res) => {
    const { name, price, description } = req.body;
    const product = new ProductModel({
      name,
      price,
      description,
    });
    await product.save();
    res.send(product);
  });
  
  productRouter.patch("/updateproduct/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedProduct = await ProductModel.findByIdAndUpdate({ _id: id }, data);
      res.status(200).send("product updated");
    } catch (error) {
      console.log("Data not found", error);
    }
  });
  
  productRouter.delete("/deleteproduct/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProduct = await ProductModel.findByIdAndDelete({ _id: id });
      res.status(200).send("product deleted");
    } catch (error) {
      console.log("Data not found", error);
    }
  });

  module.exports = productRouter;