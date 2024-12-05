import express from "express";
import UserController from "./user.controller.js";

const router = express.Router();
const userController = new UserController();

router.post("/signin", (req, res) => {
  userController.signIn(req, res)
});
router.post("/signup", (req, res) => {
  userController.signUp(req, res)
});
//or we can use
//router.post("/signup", userController.signUp.bind(userController));
//we used inline fx to correctly bind the usercontroller context to this.

export default router;