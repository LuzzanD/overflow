import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: String,
  username: String,
  password: String,
});

export const User = mongoose.model("User", userSchema);
