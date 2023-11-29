import { Schema, model, models, Document } from "mongoose";

export interface IAnswer extends Document {
  title: string;
  text: string;
  tags: string;
  createdAt: Date;
}

const answerSchema = new Schema({
  title: String,
  text: String,
  tags: String,
  createdAt: Date,
});

export const Answer = models.Answer || model("Answer", answerSchema);
