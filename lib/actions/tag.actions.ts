import { connectToDatabase } from "../mongoose";
import { Tag } from "@/database/TagModel";

export const getAllTags = async () => {
  try {
    connectToDatabase();
    const allTags = await Tag.find();
    return allTags;
  } catch (error: any) {
    throw new Error(error);
  }
};
