// import { Question } from "@/database/QuestionModel";
import { connectToDatabase } from "../mongoose";
// import { User } from "@/database/UserModel";

interface HandleVoteParams {
  userId: string;
  questionId: string;
}
export const handleUpvote = async (params: HandleVoteParams) => {
  try {
    connectToDatabase();
    // const { userId, questionId } = params;
    // const mongoQuestion = Question.findOne({ _id: questionId });
    // const mongoUser = User.findOne({ _id: userId });
  } catch (error) {
    console.log(error);
  }
};

export const handleDownvote = async () => {
  try {
    connectToDatabase();
  } catch (error) {
    console.log(error);
  }
};
