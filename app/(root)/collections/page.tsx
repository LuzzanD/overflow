import React from "react";
import QuestionCard from "@/components/cards/QuestionCard";
import { getSavedQuestions } from "@/lib/actions/question.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Schema } from "mongoose";
import Image from "next/image";
import { Input } from "@/components/ui/input";

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
  const savedQuestions = await getSavedQuestions({ userId: user.id });

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="h2-bold xl:h1-bold mb-2 dark:text-slate-100">
          Saved Questions
        </h1>
      </div>
      <div className="flex h-[26px] rounded-lg sm:h-[30px] md:h-[34px] lg:h-[38px]">
        <div className="flex-center cursor-pointer rounded-l-lg bg-slate-200 p-1 hover:bg-slate-300 dark:bg-dark-100 dark:hover:bg-dark-100/70 sm:p-2">
          <div className="relative aspect-square w-[16px] xs:w-[20px] md:w-[22px] lg:w-[25px]">
            <Image
              src="/assets/icons/search.svg"
              alt="search-icon"
              fill={true}
              className="object-contain"
            />
          </div>
        </div>
        <Input className="h-full rounded-r-lg border-none bg-slate-200 px-1 text-[10px] hover:bg-slate-300 focus:outline-none dark:bg-dark-100 dark:text-slate-100 dark:hover:bg-dark-100/70 sm:px-2 sm:text-[12px] md:text-[14px] lg:px-4" />
      </div>
      <div className="flex flex-col gap-4">
        {savedQuestions ? (
          savedQuestions.map((question: Props) => {
            const parsedQuestionId = JSON.stringify(question._id);
            const parsedDate = JSON.stringify(question.createdAt);
            const { clerkId, name, profilePictureUrl } = question.author;
            return (
              <QuestionCard
                key={parsedQuestionId}
                author={name}
                authorId={clerkId}
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
