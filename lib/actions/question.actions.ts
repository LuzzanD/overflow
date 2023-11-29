"use server";

import { Question, IQuestion } from "@/database/QuestionModel";
import { connectToDatabase } from "../mongoose";

interface GetQuestionByIdPararam {
  id: string;
}

export const createQuestion = async (params: IQuestion) => {
  try {
    const { author, title, text, tags, createdAt } = params;
    await connectToDatabase();
    await Question.create({ author, title, text, tags, createdAt });
    console.log(author, title, text, tags, createdAt);
  } catch (error) {
    console.log("Unable to connect to database", error);
  }
};

export const getQuestionById = async ({ id }: GetQuestionByIdPararam) => {
  try {
    await connectToDatabase();
    console.log(id);
    const question = await Question.findOne({ _id: id });
    return question;
  } catch (error) {}
};

export const getQuestions = async () => {
  try {
    await connectToDatabase();
    const allQuestions = await Question.find();
    return allQuestions;
  } catch (error) {
    console.log("Unable to connect to database", error);
  }
};
