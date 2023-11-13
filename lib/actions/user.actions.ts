"use server";

import { connectToDatabase } from "../mongoose";
import { User } from "@/database/UserModel";

export const createUser = () => {
  try {
    connectToDatabase();
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (params: any) => {
  const { userId } = params;
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
  }
};
