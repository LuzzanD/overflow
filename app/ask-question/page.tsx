import Question from "@/components/forms/Question";
import React from "react";

const AskQuestion = () => {
  return (
    <div className="flex w-full flex-col gap-8 p-8">
      <h1 className="h1-bold mb-2">Ask a public question</h1>
      <Question />
    </div>
  );
};

export default AskQuestion;
