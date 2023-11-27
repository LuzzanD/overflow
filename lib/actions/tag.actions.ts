import { connectToDatabase } from "../mongoose";
import { Tag, ITag } from "@/database/TagModel";

export const getAllTags = async () => {
  try {
    connectToDatabase();
    const allTags: ITag[] = await Tag.find();
    return allTags;
  } catch (error) {
    console.log(error);
  }
};
