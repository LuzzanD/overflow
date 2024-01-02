import { Schema, model, models, Document } from "mongoose";

export interface IQuestion extends Document {
  author: Schema.Types.ObjectId;
  title: string;
  text: string;
  tags: Schema.Types.ObjectId[];
  answers: Schema.Types.ObjectId[];
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  views: number;
  createdAt: Date;
}

const questionSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  text: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const Question = models.Question || model("Question", questionSchema);
