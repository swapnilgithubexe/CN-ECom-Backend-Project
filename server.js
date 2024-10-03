import express from "express";
import bodyParser from "body-parser";
const server = express();

server.use(bodyParser.json());

//Routes
import productRouter from "./src/features/product/product.routes.js";

// Mount productRouter on '/products'
server.use("/products", productRouter);

server.get("/", (req, res) => {
  res.send("Welcome Guys!");
});

server.listen(4000, () => {
  console.log("Server is running on PORT number 4000");
});
