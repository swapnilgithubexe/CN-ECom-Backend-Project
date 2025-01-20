import mongoose, { Schema } from "mongoose";

export const cartSchema = new mongoose.Schema({
  quantity: Number,
  productID: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})