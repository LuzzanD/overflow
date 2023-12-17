import { Schema, model, models, Document } from "mongoose";

export interface IAnswer extends Document {
  author: Schema.Types.ObjectId;
  text: string;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const answerSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

export const Answer = models.Answer || model("Answer", answerSchema);
