"use server";

import { Question } from "@/database/QuestionModel";
import { connectToDatabase } from "../mongoose";
import { Tag } from "@/database/TagModel";
import { User } from "@/database/UserModel";

interface FilterProps {
  filter: string;
}

export const getAllTags = async (params: FilterProps) => {
  try {
    connectToDatabase();
    const { filter } = params;

    let sortOption: {};

    switch (filter) {
      case "most popular":
        sortOption = { questions: -1 };
        break;
      case "alphabetically":
        sortOption = { name: 1 };
        break;

      default:
        sortOption = { questions: -1 };
    }
    const allTags = await Tag.find().sort(sortOption);
    return allTags;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getRightSideBarTags = async () => {
  try {
    connectToDatabase();

    const allTags = await Tag.find();
    return allTags;
  } catch (error: any) {
    throw new Error(error);
  }
};

interface GetTagByName {
  name: string;
}

export const getTagByName = async (params: GetTagByName) => {
  const { name } = params;
  try {
    connectToDatabase();
    const tag = await Tag.findOne({ name }).populate({
      path: "questions",
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
      select: "_id createdAt title author tags views upvotes answers",
    });
    return tag.questions;
  } catch (error: any) {
    throw new Error(error);
  }
};
