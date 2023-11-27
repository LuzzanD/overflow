import { Schema, model, models } from "mongoose";

export interface ITag {
  name: string;
  explanation: string;
  questions: string[];
}

const tagSchema = new Schema({
  name: String,
  explanation: String,
  questions: [String],
});

export const Tag = models.Tag || model("Tag", tagSchema);
