"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionCard from "@/components/cards/QuestionCard";
import { Schema } from "mongoose";
import React, { useState } from "react";
import AnswerCard from "../cards/AnswerCard";

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

interface AnswerProps {
  _id: string;
  createdAt: string;
  question: {
    _id: Schema.Types.ObjectId;
    title: string;
    tags: { name: string }[];
  };
  author: {
    name: string;
    profilePictureUrl: string;
  };
  upvotes: Schema.Types.ObjectId[];
}

interface Params {
  questions?: string;
  answers?: string;
}

const ProfileTabs = ({ questions, answers }: Params) => {
  const [active, setActive] = useState("questions");
  const parsedQuestions = questions && JSON.parse(questions);
  const parsedAnswers = answers && JSON.parse(answers);
  return (
    <div className="mt-12">
      <Tabs defaultValue="questions" className="">
        <TabsList className="mb-4">
          <TabsTrigger
            value="questions"
            onClick={() => {
              setActive("questions");
            }}
            className={`${
              active === "questions"
                ? "primary-gradient dark:secondary-gradient text-slate-100"
                : "bg-slate-200 text-slate-500 dark:bg-dark-100 dark:text-slate-200"
            } w-[120px] rounded-l-md px-1 py-2.5 text-[13px] font-semibold `}
          >
            Questions
          </TabsTrigger>
          <TabsTrigger
            value="answers"
            onClick={() => {
              setActive("answers");
            }}
            className={`${
              active === "answers"
                ? "primary-gradient dark:secondary-gradient text-slate-100"
                : "bg-slate-200  text-slate-500 dark:bg-dark-100 dark:text-slate-200"
            } w-[120px]  rounded-r-md px-1 py-2.5 text-[13px] font-semibold  `}
          >
            Answers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="questions">
          <div className="flex flex-col gap-4">
            {parsedQuestions.map((question: QuestionProps) => {
              const { clerkId, name, profilePictureUrl } = question.author;
              return (
                <QuestionCard
                  key={JSON.stringify(question._id)}
                  id={JSON.stringify(question._id)}
                  authorId={clerkId}
                  title={question.title}
                  tags={question.tags}
                  createdAt={JSON.stringify(question.createdAt)}
                  author={name}
                  profilePictureUrl={profilePictureUrl}
                  views={question.views}
                  upvoteNumber={question.upvotes.length}
                  answersNumber={question.answers.length}
                />
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="answers">
          <div className="flex flex-col gap-4">
            {parsedAnswers.map((answer: AnswerProps) => {
              const { _id, title, tags } = answer.question;
              const { name, profilePictureUrl } = answer.author;
              return (
                <AnswerCard
                  key={JSON.stringify(answer._id)}
                  answerId={JSON.stringify(answer._id)}
                  questionId={JSON.stringify(_id)}
                  tags={tags}
                  title={title}
                  createdAt={JSON.stringify(answer.createdAt)}
                  author={name}
                  profilePictureUrl={profilePictureUrl}
                  upvoteNumber={answer.upvotes.length}
                />
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
