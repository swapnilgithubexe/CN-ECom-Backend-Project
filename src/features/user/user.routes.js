import express from "express";
import UserController from "./user.controller.js";

const router = express.Router();
const userController = new UserController();

router.post("/signin", userController.signIn);
router.post("/signup", userController.signUp);

export default router;