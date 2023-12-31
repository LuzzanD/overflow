import { Schema, model, models, Document } from "mongoose";

export interface IInteraction extends Document {
  userId: Schema.Types.ObjectId;
  action: string;
  question: Schema.Types.ObjectId;
  answer: Schema.Types.ObjectId;
  createdAt: Date;
}

const interactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  action: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  answer: { type: Schema.Types.ObjectId, ref: "Answer" },
  createdAt: { type: Date, default: Date.now },
});

export const Interaction =
  models.Interaction || model("Interaction", interactionSchema);
