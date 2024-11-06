import express from "express";
import { CartItemsController } from "./cart.controller.js";


const cartRouter = express.Router();
const cartController = new CartItemsController()

cartRouter.post("/", cartController.add)


export default cartRouter;