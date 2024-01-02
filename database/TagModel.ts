import { Schema, model, models, Document } from "mongoose";

export interface ITag extends Document {
  name: string;
  questions: Schema.Types.ObjectId[];
}

const tagSchema = new Schema({
  name: { type: String },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
});

export const Tag = models.Tag || model("Tag", tagSchema);
