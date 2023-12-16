import { connectToDatabase } from "../mongoose";
import { Answer } from "@/database/AnswerModel";
import { Question } from "@/database/QuestionModel";
import { revalidatePath } from "next/cache";

interface CreateAnswerParams {
  author: string;
  question: string;
  text: string;
}

export const createAnswer = async (params: CreateAnswerParams) => {
  try {
    const { author, question, text } = params;
    await connectToDatabase();
    const newAnswer = await Answer.create({ author, text });
    await Question.findOneAndUpdate(
      { _id: question },
      { $push: { answers: newAnswer._id } },
      { new: true }
    );
    revalidatePath("/");
  } catch (error) {
    console.log("Unable to connect to database", error);
  }
};
