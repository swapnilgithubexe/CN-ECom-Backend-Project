import { ApplicationError } from "../../error/applicationError.js";
import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {
  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;
      const user = await UserModel.SignUp(name, email, password, type)
      res.status(201).send(user);
    } catch (error) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  signIn(req, res) {
    const result = UserModel.SignIn(req.body.email, req.body.password);
    if (!result) {
      return res.status(400).send("Invalid Credentials/User not found!")
    }
    else {
      const token = jwt.sign({ userId: result.id, email: result.email }, "TELLMEDOYOUBLEED?", { expiresIn: "1h" })
      return res.status(200).send(token)
    }
  }
}