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



  async resetPassword(userID, newPassword) {
    try {
      if (!mongoose.Types.ObjectId.isValid(userID)) {
        throw new ApplicationError("Invalid user ID", 400);
      }

      let user = await UserModel.findById(userID);

      if (!user) {
        throw new Error("User not found!");
      }

      user.password = newPassword;
      await user.save();

      return "Password reset successfully";
    } catch (error) {
      console.error("Error in repository:", error);
      throw new ApplicationError("Something went wrong with the database", 500);
    }
  }

}