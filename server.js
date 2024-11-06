import express from "express";
import bodyParser from "body-parser";
const server = express();

server.use(bodyParser.json());

//Routes
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import cartRouter from "./src/features/cart/cart.routes.js";

// Mount productRouter on '/products'
server.use("/products", jwtAuth, productRouter);
server.use("/api/users", userRouter);
server.use("api/cartItems", cartRouter)

server.get("/", (req, res) => {
  res.send("Welcome Guys!");
});

server.listen(4000, () => {
  console.log("Server is running on PORT number 4000");
});
