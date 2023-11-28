import QuestionCard from "@/components/cards/QuestionCard";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { getQuestions } from "@/lib/actions/question.actions";

const Home = async () => {
  const fetchedQuestions = await getQuestions();

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="h1-bold mb-2 dark:text-slate-100">All questions</h1>
        <Button className="primary-gradient dark:secondary-gradient ml-auto block w-[200px] text-white">
          Ask the question!
        </Button>
      </div>
      <div className="flex w-full rounded-lg bg-slate-200/90">
        <div className="flex-center relative w-[50px] cursor-pointer rounded-l-lg hover:bg-transparent/5">
          <Image
            src="/assets/icons/search.svg"
            alt="search-icon"
            width={25}
            height={25}
          />
        </div>
        <Input className="rounded-r-lg border-none bg-transparent hover:bg-transparent/5 focus:outline-none" />
      </div>
      <div className="flex flex-col gap-4">
        {fetchedQuestions &&
          fetchedQuestions.map((question) => {
            return <QuestionCard key={question.id} question={question} />;
          })}
      </div>
    </div>
  );
};

export default Home;
