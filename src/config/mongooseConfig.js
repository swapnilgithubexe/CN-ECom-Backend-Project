import mongoose from "mongoose";
import dotenv from "dotenv";
import categorySchema from "../features/product/category.schema.js";

dotenv.config();
const url = process.env.DB_URL;

export const connectDatabase = async () => {
  try {
    await mongoose.connect(url);
    addCategories()
    console.log("Database is connected");

  } catch (error) {
    console.log(error);

  }
}

async function addCategories() {
  const CategoryModel = mongoose.model("Category", categorySchema);
  const categories = await CategoryModel.find();
  if (!categories || categories.length === 0) {
    await CategoryModel.insertMany([{ name: "Books" }, { name: "Clothing" }])
  }
  console.log("Categories populated!");

}