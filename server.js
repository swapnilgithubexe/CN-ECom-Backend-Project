import express from "express";
import bodyParser from "body-parser";
const server = express();
import swagger from "swagger-ui-express";
import apiDocs from "./swagger.json" assert {type: 'json'};


//CORS policy config
server.use((req, res, next) => {
  res.header("Acess-Control-Allow-Origin", "*")
  //return ok for pre flight request
  if (req.method == "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
})

server.use(bodyParser.json());

//Routes
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import cartRouter from "./src/features/cart/cart.routes.js";


// Mount productRouter on '/products'
server.use("/products", jwtAuth, productRouter);
server.use("/api/users", userRouter);
server.use("/api/cartItems", jwtAuth, cartRouter)

server.get("/", (req, res) => {
  res.send("Welcome Guys!");
});

server.use("/api-docs", swagger.serve, swagger.setup(apiDocs))

//For routes which doesn't exist
server.use((req, res) => {
  res.status(404).send("<h1>API not found!</h1>")
})

server.listen(4000, () => {
  console.log("Server is running on PORT number 4000");
});
