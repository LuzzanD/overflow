import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  author: String,
  title: String,
  tags: String,
});

export const Question = mongoose.model("Question", questionSchema);
