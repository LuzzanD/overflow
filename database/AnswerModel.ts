import { Schema, model } from "mongoose";

const answerSchema = new Schema({
  title: String,
  text: String,
  tags: String,
  createdAt: Date,
});

export const Answer = model("Answer", answerSchema);
