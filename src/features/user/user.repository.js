import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../error/applicationError.js";

const UserModel = mongoose.model("User", userSchema)


export default class UserRepository {
  async signup(user) {
    try {
      const newUser = new UserModel(user);
      await newUser.save();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with the database", 500)

    }
  }

  async signin(email, password) {
    try {
      return await UserModel.findOne({ email, password });

    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with the database", 500)

    }
  }
}