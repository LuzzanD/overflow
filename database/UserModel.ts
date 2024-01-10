import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  username: string;
  password: string;
  name: string;
  bio: string;
  portfolioLink: string;
  locationString: string;
  profilePictureUrl: string;
  questions: Schema.Types.ObjectId[];
  answers: Schema.Types.ObjectId[];
  tags: Schema.Types.ObjectId[];
  savedQuestions: Schema.Types.ObjectId[];
  reputation: number;
  joinedAt: Date;
}

const userSchema = new Schema({
  clerkId: { type: String, required: true },
  username: { type: String },
  password: { type: String },
  name: { type: String },
  bio: { type: String },
  portfolioLink: { type: String },
  profilePictureUrl: { type: String },
  locationString: { type: String },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  answers: [{ type: Schema.Types.ObjectId, ref: "Answers" }],
  tags: [{ type: Schema.Types.ObjectId, ref: "Tags" }],
  savedQuestions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  reputation: { type: Number },
  joinedAt: { type: Date, default: Date.now },
});

export const User = models.User || model("User", userSchema);
