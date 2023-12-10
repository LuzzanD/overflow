"use server";

import { Question } from "@/database/QuestionModel";
import { connectToDatabase } from "../mongoose";
import { User } from "@/database/UserModel";
import { revalidatePath } from "next/cache";

interface GetQuestionByIdPararam {
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
    await Question.create({ author, title, text, tags });
  } catch (error) {
    console.log("Unable to connect to database", error);
  }
};

export const getQuestionById = async ({ id }: GetQuestionByIdPararam) => {
  try {
    await connectToDatabase();
    console.log(id);
    const question = await Question.findOne({ _id: id }).populate({
      path: "author",
      model: User,
    });
    return question;
  } catch (error) {}
};

export const getQuestions = async () => {
  try {
    await connectToDatabase();
    const allQuestions = await Question.find().sort({
      createdAt: -1,
    });
    return allQuestions;
  } catch (error) {
    console.log("Unable to connect to database", error);
  }
};

export interface upvoteAndDownvoteParams {
  userId: string;
  questionId: string;
  path: string;
}

export const handleUpvote = async (params: upvoteAndDownvoteParams) => {
  try {
    connectToDatabase();
    const { userId, questionId, path } = params;
    const mongoQuestion = await Question.findOne({ _id: questionId });
    const mongoUser = await User.findOne({ _id: userId });

    const isUpvoted = mongoQuestion.upvotes.includes(mongoUser._id);
    const isDownvoted = mongoQuestion.downvotes.includes(mongoUser._id);

    isUpvoted
      ? await Question.findOneAndUpdate(
          { _id: questionId },
          { $pull: { upvotes: userId } }
        )
      : isDownvoted
      ? await Question.findOneAndUpdate(
          { _id: questionId },
          { $push: { upvotes: userId }, $pull: { downvotes: userId } }
        )
      : await Question.findOneAndUpdate(
          { _id: questionId },
          { $push: { upvotes: userId } }
        );
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const handleDownvote = async (params: upvoteAndDownvoteParams) => {
  try {
    connectToDatabase();
    const { userId, questionId, path } = params;
    const mongoQuestion = await Question.findOne({ _id: questionId });
    const mongoUser = await User.findOne({ _id: userId });

    const isUpvoted = mongoQuestion.upvotes.includes(mongoUser._id);
    const isDownvoted = mongoQuestion.downvotes.includes(mongoUser._id);

    isDownvoted
      ? await Question.findOneAndUpdate(
          { _id: questionId },
          { $pull: { downvotes: userId } }
        )
      : isUpvoted
      ? await Question.findOneAndUpdate(
          { _id: questionId },
          { $push: { downvotes: userId }, $pull: { upvotes: userId } }
        )
      : await Question.findOneAndUpdate(
          { _id: questionId },
          { $push: { downvotes: userId } }
        );
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const handleSave = async (params: upvoteAndDownvoteParams) => {
  try {
    connectToDatabase();
    const { userId, questionId, path } = params;
    const mongoQuestion = await Question.findOne({ _id: questionId });
    const mongoUser = await User.findOne({ _id: userId });

    const isSaved = mongoUser.savedQuestions.includes(mongoQuestion._id);

    isSaved
      ? await User.findOneAndUpdate(
          {
            _id: userId,
          },
          { $pull: { savedQuestions: questionId } }
        )
      : await User.findOneAndUpdate(
          {
            _id: userId,
          },
          { $push: { savedQuestions: questionId } }
        );

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};
