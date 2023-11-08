import { Schema, model } from "mongoose";

const questionSchema = new Schema({
  title: String,
  text: String,
  tags: String,
  createdAt: Date,
});

export const Question = model("Question", questionSchema);
