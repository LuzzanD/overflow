"use server";

import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import { Question } from "@/database/QuestionModel";
import { Answer } from "@/database/AnswerModel";
import { User } from "@/database/UserModel";
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
      { $push: { questions: newQuestion._id }, $inc: { reputation: 5 } }
    );

    questionTags = [];
    revalidatePath("/");
  } catch (error: any) {
    throw new Error(error);
  }
};

interface FilterProps {
  filter: string;
}

export const getQuestions = async (params: FilterProps) => {
  try {
    await connectToDatabase();
    const { filter } = params;

    let sortOption: {};

    switch (filter) {
      case "newest":
        sortOption = { createdAt: -1 };
        break;
      case "recommended questions":
        sortOption = { upvotes: 1 };
        break;

      case "frequent":
        sortOption = { views: -1 };
        break;

      case "unanswered":
        sortOption = { answers: 1 };
        break;

      default:
        sortOption = { createdAt: -1 };
    }

    const allQuestions = await Question.find()
      .populate({
        path: "author",
        model: User,
        select: "clerkId name profilePictureUrl",
      })
      .populate({
        path: "tags",
        model: Tag,
        select: "name",
        options: {
          lean: true,
        },
      })
      .sort(sortOption);
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
    const question = await Question.findOne({ _id: id }).populate([
      {
        path: "author",
        model: User,
        select: "clerkId name profilePictureUrl",
      },
      {
        path: "answers",
        model: Answer,
        populate: {
          path: "author",
          model: User,
          select: "clerkId name profilePictureUrl",
        },
      },
      { path: "tags", model: Tag, select: "name", options: { lean: true } },
    ]);

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
    const userQuestions = await Question.find({ author: id }).populate([
      {
        path: "author",
        model: User,
        select: "_id clerkId name profilePictureUrl",
      },
      {
        path: "tags",
        model: Tag,
        select: "name",
      },
    ]);
    return userQuestions;
  } catch (error: any) {
    throw new Error(error);
  }
};

interface GetSavedQuestionsProps {
  userId: string;
}

export const getSavedQuestions = async (params: GetSavedQuestionsProps) => {
  const { userId } = params;
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId })
      .populate({
        path: "savedQuestions",
        model: Question,
        populate: [
          {
            path: "author",
            model: User,
            select: "clerkId name profilePictureUrl",
          },
          {
            path: "tags",
            model: Tag,
            select: "name",
            options: { lean: true },
          },
        ],
      })
      .sort({ createdAt: -1 });
    return user.savedQuestions;
  } catch (error) {
    console.log(error);
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
  authorId: string;
  path: string;
}

export const deleteQuestion = async (params: DeleteQuestionParams) => {
  const { questionId, authorId, path } = params;
  console.log(questionId, authorId, path);
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
    const deletedAnswers = await Answer.find({ question: question._id });
    await Answer.deleteMany({ question: question._id });
    await User.updateMany(
      {
        $or: [
          { clerkId: authorId }, // Remove references for the question creator
          { answers: { $in: deletedAnswers.map((answer) => answer._id) } }, // Remove references for all users who answered the question
        ],
      },
      {
        $pull: {
          questions: question._id,
          answers: { $in: deletedAnswers.map((answer) => answer._id) },
        },
      }
    );
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(error);
  }
};
