import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  type: { type: String, enum: ["seller", "customer"] }
})