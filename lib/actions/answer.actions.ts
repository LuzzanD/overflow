"use server";

import { connectToDatabase } from "../mongoose";
import { Answer } from "@/database/AnswerModel";
import { Question } from "@/database/QuestionModel";
import { revalidatePath } from "next/cache";

interface CreateAnswerParams {
  author: string;
  questionId: string;
  text: string;
}

export const createAnswer = async (params: CreateAnswerParams) => {
  try {
    const { author, questionId, text } = params;
    await connectToDatabase();
    const newAnswer = await Answer.create({ author, questionId, text });
    await Question.findOneAndUpdate(
      { _id: questionId },
      { $push: { answers: newAnswer._id } },
      { new: true }
    );
    revalidatePath("/");
  } catch (error) {
    console.log("Unable to connect to database", error);
  }
};

interface getAnswersByIdProps {
  passedQuestionId: string;
}

export const getAnswersByQuestionId = async (params: getAnswersByIdProps) => {
  const { passedQuestionId } = params;
  try {
    // Find the question by ID and populate the "answers" field
    const answers = await Answer.find({ questionId: passedQuestionId });

    return answers;
  } catch (error: any) {
    throw new Error(error);
  }
};
