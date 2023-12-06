import Question from "@/components/forms/Question";
import React from "react";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const AskQuestion = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });
  console.log(mongoUser);

  return (
    <div className="flex w-full flex-col gap-8">
      <h1 className="h2-bold xl:h1-bold mb-2 dark:text-slate-100">
        Ask a public question
      </h1>
      <Question id={mongoUser && JSON.stringify(mongoUser._id)} />
    </div>
  );
};

export default AskQuestion;
