"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionCard from "@/components/cards/QuestionCard";
import { Schema } from "mongoose";
import React, { useState } from "react";

interface Props {
  _id: string;
  title: string;
  tags: string[];
  createdAt: string;
  author: {
    name: string;
    profilePictureUrl: string;
  };
  views: number;
  upvotes: Schema.Types.ObjectId[];
  answers: Schema.Types.ObjectId[];
}

interface Params {
  questions: string;
}

const ProfileTabs = ({ questions }: Params) => {
  const [active, setActive] = useState("questions");
  const parsedQuestions = JSON.parse(questions);
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
                ? "bg-slate-300/50  text-orange-500 dark:bg-dark-100/50"
                : "bg-slate-200/70 text-slate-500 dark:bg-dark-200 dark:text-slate-200"
            } w-[120px] rounded-l-md px-2 py-3 text-[13px] font-semibold`}
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
                ? "bg-slate-300/50  text-orange-500 dark:bg-dark-100/50"
                : "bg-slate-200/70 text-slate-500 dark:bg-dark-200 dark:text-slate-200"
            } w-[120px]  rounded-r-md px-2 py-3 text-[13px] font-semibold  `}
          >
            Answers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="questions">
          <div>
            {parsedQuestions.map((question: Props) => {
              const { name, profilePictureUrl } = question.author;
              return (
                <QuestionCard
                  key={JSON.stringify(question._id)}
                  id={JSON.stringify(question._id)}
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
        <TabsContent value="answers">Answers</TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
