"use server";

import { Question, IQuestion } from "@/database/QuestionModel";
import { connectToDatabase } from "../mongoose";
import { User } from "@/database/UserModel";
import { revalidatePath } from "next/cache";
import { Answer } from "@/database/AnswerModel";

export interface upvoteAndDownvoteParams {
  userId: string;
  id: string;
  type: string;
  path: string;
}

export const handleUpvote = async (params: upvoteAndDownvoteParams) => {
  try {
    connectToDatabase();
    const { userId, id, type, path } = params;
    const mongoUser = await User.findOne({ _id: userId });
    if (type === "question") {
      const mongoQuestion = await Question.findOne({ _id: id });

      const isUpvoted = mongoQuestion.upvotes.includes(mongoUser._id);
      const isDownvoted = mongoQuestion.downvotes.includes(mongoUser._id);

      isUpvoted
        ? await Question.findOneAndUpdate(
            { _id: id },
            { $pull: { upvotes: userId } }
          )
        : isDownvoted
        ? await Question.findOneAndUpdate(
            { _id: id },
            { $push: { upvotes: userId }, $pull: { downvotes: userId } }
          )
        : await Question.findOneAndUpdate(
            { _id: id },
            { $push: { upvotes: userId } }
          );
    } else if (type === "answer") {
      const mongoAnswer = await Answer.findOne({ _id: id });

      const isUpvoted = mongoAnswer.upvotes.includes(mongoUser._id);
      const isDownvoted = mongoAnswer.downvotes.includes(mongoUser._id);

      isUpvoted
        ? await Answer.findOneAndUpdate(
            { _id: id },
            { $pull: { upvotes: userId } }
          )
        : isDownvoted
        ? await Answer.findOneAndUpdate(
            { _id: id },
            { $push: { upvotes: userId }, $pull: { downvotes: userId } }
          )
        : await Answer.findOneAndUpdate(
            { _id: id },
            { $push: { upvotes: userId } }
          );
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const handleDownvote = async (params: upvoteAndDownvoteParams) => {
  try {
    connectToDatabase();
    const { userId, id, type, path } = params;
    const mongoUser = await User.findOne({ _id: userId });

    if (type === "question") {
      const mongoQuestion = await Question.findOne({ _id: id });

      const isUpvoted = mongoQuestion.upvotes.includes(mongoUser._id);
      const isDownvoted = mongoQuestion.downvotes.includes(mongoUser._id);

      isDownvoted
        ? await Question.findOneAndUpdate(
            { _id: id },
            { $pull: { downvotes: userId } }
          )
        : isUpvoted
        ? await Question.findOneAndUpdate(
            { _id: id },
            { $push: { downvotes: userId }, $pull: { upvotes: userId } }
          )
        : await Question.findOneAndUpdate(
            { _id: id },
            { $push: { downvotes: userId } }
          );
    } else if (type === "answer") {
      const mongoAnswer = await Answer.findOne({ _id: id });

      const isUpvoted = mongoAnswer.upvotes.includes(mongoUser._id);
      const isDownvoted = mongoAnswer.downvotes.includes(mongoUser._id);

      isDownvoted
        ? await Answer.findOneAndUpdate(
            { _id: id },
            { $pull: { downvotes: userId } }
          )
        : isUpvoted
        ? await Answer.findOneAndUpdate(
            { _id: id },
            { $push: { downvotes: userId }, $pull: { upvotes: userId } }
          )
        : await Answer.findOneAndUpdate(
            { _id: id },
            { $push: { downvotes: userId } }
          );
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const handleSave = async (params: upvoteAndDownvoteParams) => {
  try {
    connectToDatabase();
    const { userId, id, path } = params;

    const mongoQuestion = await Question.findOne({ _id: id });
    const mongoUser = await User.findOne({ _id: userId });
    const mongoQuestionId = JSON.parse(JSON.stringify(mongoQuestion._id));

    const isSaved = mongoUser.savedQuestions.some((element: IQuestion) => {
      const parsedElementId = JSON.parse(JSON.stringify(element._id));
      return parsedElementId === mongoQuestionId;
    });

    isSaved
      ? await User.findOneAndUpdate(
          { _id: userId },
          {
            $pull: {
              savedQuestions: mongoQuestion._id,
            },
          }
        )
      : await User.findOneAndUpdate(
          { _id: userId },
          { $push: { savedQuestions: mongoQuestion._id } }
        );

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

interface ViewProps {
  id: string;
  path: string;
}

export const handleView = async (params: ViewProps) => {
  const { id, path } = params;
  try {
    await connectToDatabase();
    await Question.findOneAndUpdate(
      { _id: JSON.parse(id) },
      { $inc: { views: 1 } }
    );

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(error);
  }
};
