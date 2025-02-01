import mongoose, { Document } from "mongoose";

export const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: "User"
  },
  likeable: {
    type: mongoose.Schema.Types.ObjectId,
    //User refPath
    refPath: "types"
  },
  types: {
    type: String,
    enum: ["Product", "Category"]
  }
}).pre("save", (next) => {
  console.log("New like has been added");
  next();
}).post("save", (doc) => {
  console.log("Like is saved", doc);

});