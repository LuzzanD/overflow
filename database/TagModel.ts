import { Schema, model, models, Document } from "mongoose";

export interface ITag extends Document {
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
