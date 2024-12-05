import { ApplicationError } from "../../error/applicationError.js";
import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.respository.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;
      const user = new UserModel(name, email, password, type)

      await this.userRepository.SignUp(user);
      res.status(201).send(user);
    } catch (error) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async signIn(req, res) {
    try {
      const result = await this.userRepository.SignIn(req.body.email, req.body.password);
      if (!result) {
        return res.status(400).send("Invalid Credentials/User not found!")
      }
      else {
        const token = jwt.sign({ userId: result.id, email: result.email }, "TELLMEDOYOUBLEED?", { expiresIn: "1h" })
        return res.status(200).send(token)
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send("Something went wrong")

    }
  }
}