import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
  name: { type: String },
  desc: String,
  imageURL: URL,
  category: String,
  price: Number,
  inStock: Number,
  sizes: { type: String, enum: ["L", "XL", "XXL"] },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: "Review"
    }
  ]
});