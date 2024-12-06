import { ApplicationError } from "../../error/applicationError.js";
import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.respository.js";
import bcrypt from "bcrypt";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;

      //hashing password
      const hashedPassword = await bcrypt.hash(password, 11)
      const user = new UserModel(name, email, hashedPassword, type)

      await this.userRepository.SignUp(user);
      res.status(201).json({
        message: "User created successfully",
        userDetails: {
          name: user.name,
          email: user.email,
          id: user._id
        }
      });
    } catch (error) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async signIn(req, res) {
    try {

      const user = await this.userRepository.findByEmail(req.body.email);
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials/ User not found!" });
      } else {
        //compare password w hashed pass
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          const token = jwt.sign({ userId: result.id, email: result.email }, "TELLMEDOYOUBLEED?", { expiresIn: "1h" })
          return res.status(200).json({
            message: "SignIn successfull",
            token: token
          });

        }
        else {
          return res.status(400).json({ message: "Invalid Credentials/User not found!" });
        }

      }

    } catch (error) {
      console.log(error);
      return res.status(400).send("Something went wrong")

    }
  }
}