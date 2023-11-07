import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  text: String,
  tags: String,
  createdAt: Date,
});

export const Question = mongoose.model("Question", questionSchema);
