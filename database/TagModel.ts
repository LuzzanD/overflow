import { Schema, model, models } from "mongoose";

const tagSchema = new Schema({
  name: String,
  tags: String,
  createdAt: Date,
});

export const Tag = models.Question || model("Tag", tagSchema);
