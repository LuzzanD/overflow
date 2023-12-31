import React from "react";
import QuestionForm from "@/components/forms/QuestionForm";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";
import { getQuestionById } from "@/lib/actions/question.actions";

const Edit = async ({ params, searchParams }: any) => {
  const { userId } = auth();
  const question = await getQuestionById({ id: params.id });

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  return (
    <div className="flex w-full flex-col gap-8">
      <h1 className="h2-bold xl:h1-bold mb-2 dark:text-slate-100">
        Edit the question
      </h1>
      <QuestionForm
        id={mongoUser && JSON.stringify(mongoUser._id)}
        question={JSON.stringify(question)}
        type="edit"
      />
    </div>
  );
};

export default Edit;
