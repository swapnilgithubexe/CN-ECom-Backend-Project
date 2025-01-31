import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { ApplicationError } from "../../error/applicationError.js"
const LikeModel = mongoose.Schema("Like", likeSchema)
export class LikeRepository {


  async likeProduct(userId, productId) {
    try {
      const newLikeObject = new LikeModel({
        user: new ObjectId(userId),
        likeable: new ObjectId(productId),
        types: "Product"
      })

      await newLikeObject.save();
    } catch (error) {
      console.log("Error in the likeProduct function", error);
      throw new ApplicationError("Something went wrong with the databases", 500)
    }
  }

  async likeCategory(userId, categoryId) {
    try {
      const newLikeObject = new LikeModel({
        user: new ObjectId(userId),
        likeable: new ObjectId(categoryId),
        types: "Category"
      })

      await newLikeObject.save();
    } catch (error) {
      console.log("Error in the likeCategory function", error);
      throw new ApplicationError("Something went wrong with the databases", 500)
    }
  }
}