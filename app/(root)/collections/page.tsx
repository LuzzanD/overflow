import React from "react";
import QuestionCard from "@/components/cards/QuestionCard";
import { getSavedQuestions } from "@/lib/actions/question.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Schema } from "mongoose";
import Search from "@/components/shared/Search";

interface QuestionProps {
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
  const savedQuestions = await getSavedQuestions({ userId: user.id });

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="h2-bold xl:h1-bold mb-2 dark:text-slate-100">
          Saved Questions
        </h1>
      </div>
      <div className="h-[26px] rounded-lg sm:h-[30px] md:h-[34px] lg:h-[38px]">
        <Search />
      </div>
      <div className="flex flex-col gap-4">
        {savedQuestions ? (
          savedQuestions.map((question: QuestionProps) => {
            const parsedQuestionId = JSON.stringify(question._id);
            const parsedDate = JSON.stringify(question.createdAt);
            const tagArray = question.tags.map((tag) => tag.name);
            const { clerkId, name, profilePictureUrl } = question.author;
            return (
              <QuestionCard
                key={parsedQuestionId}
                author={name}
                authorId={clerkId}
                profilePictureUrl={profilePictureUrl}
                id={parsedQuestionId}
                title={question.title}
                tags={tagArray}
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
