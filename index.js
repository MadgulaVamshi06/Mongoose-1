const connection = require("./config/db.js");
const express = require("express")
const UserModel=require("./model/user.model.js");
const ProductModel = require("./model/product.model.js");
const server = express();
server.use(express.json());


server.get("/",(req,res)=>{
    res.send("helloworld")
})


server.post("/addusers", async (req, res) => {
    try {
      const { name, email,password } = req.body;
      const user = new UserModel({
        name,
         email,
         password
      });
      await user.save();
      res.status(200).send(`Data recevied ${user}`);
    } catch (error) {
      console.log("Data not found", error);
    }
  });
  

server.listen(8000,async(req,res)=>{
try {
    await connection;
    console.log("server is running on 4000 port and connected to mongo db")
} catch (error) {
   console.log("error",error) 
}
})