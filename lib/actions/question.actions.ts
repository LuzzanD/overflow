"use server";

import { connectToDatabase } from "../mongoose";

export const createQuestion = () => {
  try {
    connectToDatabase();
    console.log("hello");
  } catch (error) {}
};

export const getQuestion = () => {
  try {
    console.log("hello");
  } catch (error) {}
};

export const getQuestions = () => {
  try {
    console.log("hello");
  } catch (error) {}
};
