import Question from "@/components/forms/Question";
// import { auth } from "@clerk/nextjs";
import React from "react";
import { getUserById } from "@/lib/actions/user.actions";
// import { redirect } from "next/navigation";

const AskQuestion = async () => {
  // const { userId } = auth();

  const userId = "123456";
  // if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });
  console.log(mongoUser);

  return (
    <div className="flex w-full flex-col gap-8 p-8">
      <h1 className="h1-bold mb-2 dark:text-slate-100">
        Ask a public question
      </h1>
      <Question id={mongoUser && JSON.stringify(mongoUser._id)} />
    </div>
  );
};

export default AskQuestion;
