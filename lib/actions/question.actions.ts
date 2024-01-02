"use server";

import { Question } from "@/database/QuestionModel";
import { connectToDatabase } from "../mongoose";
import { User } from "@/database/UserModel";
import { revalidatePath } from "next/cache";
import { Answer } from "@/database/AnswerModel";
import { Tag } from "@/database/TagModel";

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
    const newQuestion = await Question.create({ author, title, text });

    let questionTags: (typeof Tag)[] = [];

    for (const tag of tags) {
      const mongoTag = await Tag.findOneAndUpdate(
        { name: tag },
        { $addToSet: { questions: newQuestion._id } },
        { upsert: true, new: true }
      );
      questionTags.push(mongoTag._id);

      await Question.findOneAndUpdate(
        { _id: newQuestion._id },
        { $addToSet: { tags: mongoTag._id } }
      );
    }

    await Question.findOneAndUpdate(
      { _id: newQuestion._id },
      { tags: questionTags }
    );

    await User.findOneAndUpdate(
      { _id: author },
      { $push: { questions: newQuestion._id } }
    );

    questionTags = [];
    revalidatePath("/");
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
      .populate({
        path: "tags",
        model: Tag,
        select: "name",
      })
      .sort({
        createdAt: -1,
      })
      .lean();
    return allQuestions;
  } catch (error: any) {
    throw new Error(error);
  }
};

interface GetQuestionByIdParams {
  id: string;
}

export const getQuestionById = async ({ id }: GetQuestionByIdParams) => {
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
      })
      .populate({ path: "tags", model: Tag, select: "name" });

    return question;
  } catch (error: any) {
    throw new Error(error);
  }
};

interface GetQuestionByUserIdParams {
  id: string;
}

export const getQuestionsByUserId = async ({
  id,
}: GetQuestionByUserIdParams) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: id }).populate({
      path: "questions",
      model: Question,
      populate: [
        {
          path: "author",
          model: User,
          select: "_id name profilePictureUrl",
        },
        {
          path: "tags",
          model: Tag,
          select: "name",
        },
      ],
    });
    return user.questions;
  } catch (error: any) {
    throw new Error(error);
  }
};

interface EditQuestionParams {
  id: string;
  title: string;
  text: string;
}

export const editQuestion = async (params: EditQuestionParams) => {
  const { id, title, text } = params;
  try {
    await connectToDatabase();
    await Question.findOneAndUpdate(
      { _id: JSON.parse(id) },
      { $set: { title, text } }
    );
  } catch (error: any) {
    throw new Error(error);
  }
};

interface DeleteQuestionParams {
  questionId: string;
}

export const deleteQuestion = async (params: DeleteQuestionParams) => {
  const { questionId } = params;
  try {
    await connectToDatabase();
    const question = await Question.findOneAndDelete({ _id: questionId });
    if (!question) {
      throw new Error(`Question with id ${questionId} not found`);
    }
    for (const tag of question.tags) {
      await Tag.findOneAndUpdate(
        { _id: tag },
        { $pull: { questions: question._id } }
      );
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
