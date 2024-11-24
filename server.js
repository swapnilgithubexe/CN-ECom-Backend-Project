import express from "express";
import bodyParser from "body-parser";
const server = express();
import swagger from "swagger-ui-express";
import apiDocs from "./swagger.json" assert { type: "json" };
import cors from "cors";


//CORS policy config
// server.use((req, res, next) => {
//   res.header("Acess-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Allow-Methods", "*");
//   //return ok for pre flight request
//   if (req.method == "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });

var corOptions = {
  origin: "*",
  allowHeaders: "*"
}
server.use(cors(corOptions))

server.use(bodyParser.json());



//Routes
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import cartRouter from "./src/features/cart/cart.routes.js";
import loggerMiddleware, { logger } from "./src/middleware/logger.middleware.js";
import { ApplicationError } from "./src/error/applicationError.js";

server.use(loggerMiddleware)
// Mount productRouter on '/products'
server.use("/api/products", jwtAuth, productRouter);
server.use("/api/users", userRouter);
server.use("/api/cartItems", jwtAuth, cartRouter);

server.get("/", (req, res) => {
  res.send("Welcome Guys!");
});

server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

//Error handler middleware
server.use((err, req, res, next) => {
  const errorLog = {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    body: req.body
  };
  logger.error(JSON.stringify(errorLog));

  if (err instanceof ApplicationError) {
    res.status(err.code).send(err.message);
  }

  //server error
  res.status(500).send("Something went wrong, please try again later.")

})

//For routes which doesn't exist
server.use((req, res) => {
  res.status(404).send("<h1>API not found!</h1>");
});

server.listen(4000, () => {
  console.log("Server is running on PORT number 4000");
});
