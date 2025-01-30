import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String },
  // imageURL: {
  //   type: String,
  //   required: true,
  //   validate: {
  //     validator: function (v) {
  //       return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i.test(v);
  //     },
  //     message: "Invalid URL format for image!",
  //   },
  // },
  price: Number,
  category: String,
  description: String,
  inStock: Number,
  sizes: { type: String, enum: ["L", "XL", "XXL"] },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: "Review"
    }
  ],
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }]
});

export default productSchema;