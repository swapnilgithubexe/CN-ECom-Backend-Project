import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.DB_URL;

export const connectDatabase = async () => {
  try {
    await mongoose.connect(url, { userNewUrlParser: true, useUnifiedTopology: true });
    console.log("Database is connected");

  } catch (error) {

  }
}