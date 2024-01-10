"use server";

import { connectToDatabase } from "../mongoose";
import { Answer } from "@/database/AnswerModel";
import { Question } from "@/database/QuestionModel";
import { Tag } from "@/database/TagModel";
import { User } from "@/database/UserModel";
import { revalidatePath } from "next/cache";

interface CreateAnswerParams {
  author: string;
  question: string;
  text: string;
  path: string;
}

export const createAnswer = async (params: CreateAnswerParams) => {
  try {
    const { author, question, text, path } = params;
    await connectToDatabase();
    const newAnswer = await Answer.create({ author, question, text });
    await Question.findOneAndUpdate(
      { _id: question },
      { $push: { answers: newAnswer._id } },
      { new: true }
    );
    await User.findOneAndUpdate(
      { _id: author },
      { $push: { answers: newAnswer._id }, $inc: { reputation: 10 } },
      { new: true }
    );
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(error);
  }
};

interface getAnswersByUserIdProps {
  id: string;
}

export const getAnswersByUserId = async (params: getAnswersByUserIdProps) => {
  const { id } = params;
  try {
    await connectToDatabase();

    const userAnswers = await Answer.find({ author: id }).populate([
      {
        path: "author",
        model: User,
        select: "clerkId name profilePictureUrl",
      },
      {
        path: "question",
        model: Question,
        populate: { path: "tags", model: Tag, select: "name" },
        select: "_id title tags",
      },
    ]);

    return userAnswers;
  } catch (error: any) {
    throw new Error(error);
  }
};
