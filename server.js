import express from "express";

const server = express();

//Routes
import productRouter from "./src/features/product/product.routes.js";

server.get("/", productRouter);


server.get("/", (req, res) => {
  res.send("Welcome Guys!")
})
server.listen(4000, () => {
  console.log("Server is running on PORT number 4000");

})