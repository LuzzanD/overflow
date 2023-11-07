"use server";

import { connectToDatabase } from "../mongoose";

export const createQuestion = async () => {
  try {
    await connectToDatabase();
    console.log("hello");
  } catch (error) {
    console.log("Unable to connect to database", error);
  }
};

export const getQuestion = async () => {
  try {
    await connectToDatabase();
    console.log("hello");
  } catch (error) {}
};

export const getQuestions = async () => {
  try {
    await connectToDatabase();
    console.log("hello");
  } catch (error) {}
};
