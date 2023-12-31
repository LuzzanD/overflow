"use server";

import { Question } from "@/database/QuestionModel";
import { connectToDatabase } from "../mongoose";
import { User } from "@/database/UserModel";
import { revalidatePath } from "next/cache";
import { Answer } from "@/database/AnswerModel";
import { Tag } from "@/database/TagModel";

interface GetQuestionByIdParam {
  id: string;
}

interface CreateQuestionParams {
  author: string;
  title: string;
  text: string;
  tags: string[];
}

export const createQuestion = async (params: CreateQuestionParams) => {
  try {
    const { author, title, text, tags } = params;
    await connectToDatabase();
    tags.map(async (tag: string) => {
      await Tag.create({ name: tag });
    });
    const newQuestion = await Question.create({ author, title, text, tags });
    await User.findOneAndUpdate(
      { _id: author },
      { $push: { questions: newQuestion } }
    );
    revalidatePath("/");
  } catch (error) {
    console.log("Unable to connect to database", error);
  }
};

export const getQuestionById = async ({ id }: GetQuestionByIdParam) => {
  try {
    await connectToDatabase();
    const question = await Question.findOne({ _id: id })
      .populate({
        path: "author",
        model: User,
        select: "_id name profilePictureUrl",
      })
      .populate({
        path: "answers",
        model: Answer,
        populate: {
          path: "author",
          model: User,
          select: "_id name profilePictureUrl",
        },
      });

    console.log(question);
    return question;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getQuestionsByUserId = async ({ id }: GetQuestionByIdParam) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: id }).populate({
      path: "questions",
      model: Question,
      populate: {
        path: "author",
        model: User,
        select: "_id name profilePictureUrl",
      },
    });
    console.log(user);
    return user.questions;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getQuestions = async () => {
  try {
    await connectToDatabase();
    const allQuestions = await Question.find()
      .populate({
        path: "author",
        model: User,
        select: "_id name profilePictureUrl",
      })
      .sort({
        createdAt: -1,
      });
    return allQuestions;
  } catch (error) {
    console.log("Unable to connect to database", error);
  }
};
