/* eslint-disable camelcase */
"use server";

import { User } from "@/database/UserModel";
import { Question } from "@/database/QuestionModel";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";

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

export const getAllUsers = async () => {
  try {
    await connectToDatabase();
    const allUsers = await User.find();
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
