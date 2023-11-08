"use server";

import { connectToDatabase } from "../mongoose";

export const createUser = () => {
  try {
    connectToDatabase();
  } catch (error) {
    console.log(error);
  }
};
