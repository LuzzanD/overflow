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
}

export const createAnswer = async (params: CreateAnswerParams) => {
  try {
    const { author, question, text } = params;
    await connectToDatabase();
    const newAnswer = await Answer.create({ author, question, text });
    await Question.findOneAndUpdate(
      { _id: question },
      { $push: { answers: newAnswer._id } },
      { new: true }
    );
    await User.findOneAndUpdate(
      { _id: author },
      { $push: { answers: newAnswer._id } },
      { new: true }
    );
    revalidatePath("/");
  } catch (error: any) {
    throw new Error(error);
  }
};

interface getAnswerByIdProps {
  answerId: string;
}

export const getAnswerById = async ({ answerId }: getAnswerByIdProps) => {
  try {
    await connectToDatabase();
    const answer = await Answer.findOne({ _id: answerId });

    return answer;
  } catch (error: any) {
    throw new Error(error);
  }
};

// interface getAnswersByIdProps {
//   passedQuestionId: string;
// }

// export const getAnswersByQuestionId = async (params: getAnswersByIdProps) => {
//   const { passedQuestionId } = params;
//   try {
//     await connectToDatabase();
//     // Find the question by ID and populate the "answers" field
//     const answers = await Answer.find({ questionId: passedQuestionId });

//     return answers;
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };

interface getAnswersByUserIdProps {
  id: string;
}

export const getAnswersByUserId = async (params: getAnswersByUserIdProps) => {
  const { id } = params;
  // const parsedId = JSON.parse(id);
  try {
    await connectToDatabase();

    const user = await User.findOne({ author: id }).populate({
      path: "answers",
      model: Answer,
      populate: [
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
      ],
    });

    return user.answers;
  } catch (error: any) {
    throw new Error(error);
  }
};
