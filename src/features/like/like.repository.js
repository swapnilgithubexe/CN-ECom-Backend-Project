import mongoose from "mongoose";  // Import mongoose
import { likeSchema } from "./like.schema.js";
import { ApplicationError } from "../../error/applicationError.js";

const LikeModel = mongoose.model("Like", likeSchema);

export class LikeRepository {
  async likeProduct(userId, productId) {
    try {
      const newLikeObject = new LikeModel({
        user: new mongoose.Types.ObjectId(userId),
        likeable: new mongoose.Types.ObjectId(productId),
        types: "Product"
      });

      await newLikeObject.save();
    } catch (error) {
      console.log("Error in the likeProduct function", error);
      throw new ApplicationError("Something went wrong with the databases", 500);
    }
  }

  async likeCategory(userId, categoryId) {
    try {
      const newLikeObject = new LikeModel({
        user: new mongoose.Types.ObjectId(userId), // Use mongoose.Types.ObjectId
        likeable: new mongoose.Types.ObjectId(categoryId), // Use mongoose.Types.ObjectId
        types: "Category"
      });

      await newLikeObject.save();
    } catch (error) {
      console.log("Error in the likeCategory function", error);
      throw new ApplicationError("Something went wrong with the databases", 500);
    }
  }
  async getLikes(type, id) {
    try {
      // const objectId = new mongoose.Types.ObjectId(id);
      // console.log(`Searching for likes with type: ${type} and id: ${objectId}`);

      const likes = await LikeModel.find({
        likeable: id,
        types: type
      })
        .populate("user")
        .populate({ path: "likeable", model: type });

      console.log(`Found likes:`, likes);
      return likes;
    } catch (error) {
      console.error("Error fetching likes:", error);
      throw error; // Re-throw to be handled by the controller
    }
  }
}
