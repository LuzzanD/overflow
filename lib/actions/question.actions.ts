"use server";

import { Question } from "@/database/QuestionModel";
import { connectToDatabase } from "../mongoose";

interface IQuestion {
  title: string;
  text: string;
  tags: string;
  createdAt: Date;
}

export const createQuestion = async (params: IQuestion) => {
  const { title, text, tags, createdAt } = params;
  try {
    await connectToDatabase();
    await Question.create({ title, text, tags, createdAt });
  } catch (error) {
    console.log("Unable to connect to database", error);
  }
};

export const getQuestion = async () => {
  try {
    await connectToDatabase();
    console.log("hello");
  } catch (error) {}
};

export const getQuestions = async () => {
  try {
    await connectToDatabase();
    console.log("hello");
  } catch (error) {}
};
