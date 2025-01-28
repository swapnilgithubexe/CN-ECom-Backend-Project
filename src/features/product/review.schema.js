import mongoose, { mongo } from "mongoose";

const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId, ref: "Product"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  rating: { type: Number }
});

export default reviewSchema;