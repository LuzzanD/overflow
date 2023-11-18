"use server";

import { connectToDatabase } from "../mongoose";
import { User } from "@/database/UserModel";
import { Question } from "@/database/QuestionModel";

interface GetUserParams {
  userId: string;
}

interface CreateUserParams {
  clerkId: string;
  username: string;
  name: string;
  profilePictureUrl: string;
}

interface UpdateUserParams {
  userId: string;
  updatedData: {
    username: string;
    name: string;
    profilePictureUrl: string;
  };
}

interface DeleteUserParams {
  userId: string;
}

export const getUserById = async (params: GetUserParams) => {
  const { userId } = params;
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (params: CreateUserParams) => {
  const { clerkId, username, name, profilePictureUrl } = params;
  try {
    await connectToDatabase();
    const user = await User.create({
      clerkId,
      username,
      name,
      profilePictureUrl,
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (params: UpdateUserParams) => {
  const { userId, updatedData } = params;
  try {
    await connectToDatabase();
    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      { updatedData }
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
