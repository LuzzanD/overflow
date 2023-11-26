import { Schema, model, models } from "mongoose";

export interface ITag {
  name: string;
  tags: string;
  createdAt: Date;
}

const tagSchema = new Schema({
  name: String,
  tags: String,
  createdAt: Date,
});

export const Tag = models.Question || model("Tag", tagSchema);
