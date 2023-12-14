import React from "react";
import QuestionCard from "@/components/cards/QuestionCard";
import { getUserById } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { IQuestion } from "@/database/QuestionModel";

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
          mongoUser.savedQuestions.map((question: IQuestion) => {
            const parsedQuestionId = JSON.parse(JSON.stringify(question._id));
            const parsedDate = JSON.parse(JSON.stringify(question.createdAt));
            return (
              <QuestionCard
                key={parsedQuestionId}
                id={parsedQuestionId}
                title={question.title}
                tags={question.tags}
                createdAt={parsedDate}
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
