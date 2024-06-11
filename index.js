const connection = require("./config/db.js");
const express = require("express");
const userRouter = require("./routes/user.route.js");
const productRouter = require("./routes/product.route.js")
const server = express();
server.use(express.json());
server.use("/user",userRouter);
server.use("/product",productRouter)

server.get("/", (req, res) => {
  res.send("helloworld");
});

server.listen(8000, async (req, res) => {
  try {
    await connection;
    console.log("server is running on 4000 port and connected to mongo db");
  } catch (error) {
    console.log("error", error);
  }
});
