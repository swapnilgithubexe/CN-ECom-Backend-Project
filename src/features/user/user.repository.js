import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../error/applicationError.js";

const UserModel = mongoose.model("User", userSchema)


export default class UserRepository {
  async signUp(user) {
    try {
      const newUser = new UserModel(user);
      await newUser.save();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with the database", 500)

    }
  }

  async signIn(email, password) {
    try {
      return await UserModel.findOne({ email, password });

    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with the database", 500)

    }
  }

  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });

    } catch (error) {
      throw new ApplicationError("Something went wrong with the database.", 500);
    }
  }
}