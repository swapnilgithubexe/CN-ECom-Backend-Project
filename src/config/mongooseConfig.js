import mongoose from "mongoose";
import dotenv from "dotenv";
import { categprySchema } from "../features/product/category.schema.js";

dotenv.config();
const url = process.env.DB_URL;

export const connectDatabase = async () => {
  try {
    await mongoose.connect(url);
    console.log("Database is connected");

  } catch (error) {
    console.log(error);

  }
}

async function addCategories() {
  const CategoryModel = mongoose.model("Category", categprySchema);
}