import React from "react";
import QuestionCard from "@/components/cards/QuestionCard";
import { getUserById } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Schema } from "mongoose";

interface Props {
  _id: string;
  title: string;
  tags: { name: string }[];
  createdAt: string;
  author: {
    clerkId: string;
    name: string;
    profilePictureUrl: string;
  };
  views: number;
  upvotes: Schema.Types.ObjectId[];
  answers: Schema.Types.ObjectId[];
}

const Collections = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const mongoUser = await getUserById({ userId: user.id });

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="h2-bold xl:h1-bold mb-2 dark:text-slate-100">
          Saved Questions
        </h1>
      </div>
      <div className="flex flex-col gap-4">
        {mongoUser ? (
          mongoUser.savedQuestions.reverse().map((question: Props) => {
            const parsedQuestionId = JSON.stringify(question._id);
            const parsedDate = JSON.stringify(question.createdAt);
            const { clerkId, name, profilePictureUrl } = question.author;
            return (
              <QuestionCard
                key={parsedQuestionId}
                author={name}
                authorId={JSON.stringify(clerkId)}
                profilePictureUrl={profilePictureUrl}
                id={parsedQuestionId}
                title={question.title}
                tags={question.tags}
                createdAt={parsedDate}
                views={question.views}
                upvoteNumber={question.upvotes.length}
                answersNumber={question.answers.length}
              />
            );
          })
        ) : (
          <div className="mt-8 w-[90%] text-center">
            Waiting for the questions...
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;
