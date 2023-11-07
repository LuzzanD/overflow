import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: String,
  username: String,
  password: String,
});

export const User = mongoose.model("User", userSchema);
