import QuestionCard from "@/components/cards/QuestionCard";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
// import { getQuestions } from "@/lib/actions/question.actions";

const page = () => {
  // const fetchedQuestions = getQuestions()

  return (
    <div className="flex w-full flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="h1-bold mb-2">All questions</h1>
        <Button className="primary-gradient ml-auto block w-[200px] text-white">
          Ask the question!
        </Button>
      </div>
      <div className="background-light700_dark300 flex w-full rounded-lg">
        <div className="flex-center relative w-[50px] cursor-pointer rounded-l-lg hover:bg-transparent/5">
          <Image
            src="/assets/icons/search.svg"
            alt="search-icon"
            width={25}
            height={25}
          />
        </div>
        <Input className="rounded-r-lg bg-transparent hover:bg-transparent/5 focus:outline-none" />
      </div>
      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4].map((number) => {
          return <QuestionCard key={number} />;
        })}
      </div>
    </div>
  );
};

export default page;
