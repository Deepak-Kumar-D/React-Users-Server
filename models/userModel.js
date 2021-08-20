import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String },
  age: { type: Number, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
});

export const User = mongoose.model("User", userSchema);
