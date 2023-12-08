import { connectToDatabase } from "../mongoose";

export const handleDownvote = async () => {
  try {
    connectToDatabase();
  } catch (error) {
    console.log(error);
  }
};
