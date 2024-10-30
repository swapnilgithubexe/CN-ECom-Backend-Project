import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {
  signUp(req, res) {
    const { name, email, password, type } = req.body;
    const user = UserModel.SignUp(name, email, password, type)
    res.status(201).send(user);
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