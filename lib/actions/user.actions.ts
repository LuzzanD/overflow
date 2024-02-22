/* eslint-disable camelcase */
"use server";

import { User } from "@/database/UserModel";
import { Question } from "@/database/QuestionModel";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import { FilterQuery } from "mongoose";

interface GetUserParams {
  userId: string;
}

interface CreateUserParams {
  clerkId: string;
  username: string;
  name: string;
  profilePictureUrl: string;
  createdAt: Date;
}

interface UpdateUserParams {
  userId: string;
  username: string;
  first_name: string;
  last_name: string;
  image_url: string;
}

interface DeleteUserParams {
  userId: string;
}

export const getUserById = async (params: GetUserParams) => {
  const { userId } = params;
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId }).populate({
      path: "savedQuestions",
      model: Question,
      populate: {
        path: "author",
        model: User,
        select: "_id clerkId name profilePictureUrl joinedAt",
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

interface EditUserProps {
  userId: string;
  fullname: string;
  username: string;
  portfolioLink: string;
  locationString: string;
  bio: string;
  path: string;
}

export const editUser = async (params: EditUserProps) => {
  const {
    userId,
    fullname,
    username,
    portfolioLink,
    locationString,
    bio,
    path,
  } = params;
  try {
    await connectToDatabase();
    await User.findOneAndUpdate(
      { _id: JSON.parse(userId) },
      { name: fullname, username, portfolioLink, locationString, bio }
    );
    revalidatePath(path);
  } catch (error) {
    console.log("Unable to connect to database", error);
  }
};

interface FilterProps {
  filter: string;
  page: string;
  searchQuery: string;
}

export const getAllUsers = async (params: FilterProps) => {
  try {
    await connectToDatabase();
    const { filter, page, searchQuery } = params;

    const PAGE_SIZE = 3;
    const skipAmount =
      Number(page) - 1 === 0 ? 0 : (Number(page) - 1) * PAGE_SIZE;

    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        { username: { $regex: new RegExp(searchQuery, "i") } },
        { name: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOption: {};

    switch (filter) {
      case "most popular":
        sortOption = { questions: -1 };
        break;
      case "highest reputation":
        sortOption = { reputation: 1 };
        break;

      case "new users":
        sortOption = { joinedAt: -1 };
        break;

      default:
        sortOption = { joinedAt: -1 };
    }
    const allUsers = await User.find(query)
      .sort(sortOption)
      .limit(PAGE_SIZE)
      .skip(skipAmount);
    return allUsers;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (params: CreateUserParams) => {
  const { clerkId, username, name, profilePictureUrl, createdAt } = params;
  try {
    await connectToDatabase();
    const user = await User.create({
      clerkId,
      username,
      name,
      profilePictureUrl,
      createdAt,
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (params: UpdateUserParams) => {
  const { userId, username, first_name, last_name, image_url } = params;
  try {
    await connectToDatabase();
    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      {
        $set: {
          username: username!,
          name: `${first_name} ${last_name}`,
          profilePictureUrl: image_url,
        },
      },
      { upsert: true }
    );
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (params: DeleteUserParams) => {
  const { userId } = params;
  try {
    await connectToDatabase();
    const updatedQuestions = Question.deleteMany({ author: userId });
    const user = await User.findOneAndDelete({ clerkId: userId });
    console.log(updatedQuestions);
    return user;
  } catch (error) {
    console.log(error);
  }
};
