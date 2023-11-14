import { Schema, model, models } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  username: string;
  password: string;
  name: string;
  bio: string;
  profilePictureUrl: string;
  questions: Schema.Types.ObjectId[];
  answers: Schema.Types.ObjectId[];
  tags: Schema.Types.ObjectId[];
}

const userSchema = new Schema({
  clerkId: { type: String, required: true },
  username: { type: String },
  password: { type: String },
  name: { type: String },
  bio: { type: String },
  profilePictureUrl: { type: String },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  answers: [{ type: Schema.Types.ObjectId, ref: "Answers" }],
  tags: [{ type: Schema.Types.ObjectId, ref: "Tags" }],
});

export const User = models.User || model("User", userSchema);