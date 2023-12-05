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
        <h1 className="h2-bold xl:h1-bold mb-2 dark:text-slate-100">
          All questions
        </h1>
        <Button className="primary-gradient dark:secondary-gradient text-[12px] text-white sm:px-6 sm:text-[13px] lg:px-10 lg:text-[14px]">
          Ask the question!
        </Button>
      </div>
      <div className="flex w-full rounded-lg bg-slate-200/90">
        <div className="flex-center cursor-pointer rounded-l-lg bg-slate-200 p-1 hover:bg-slate-300 dark:bg-dark-100 dark:hover:bg-dark-100/70 sm:p-2">
          <div className="xs:w-[20px] relative aspect-square w-[16px] md:w-[22px] lg:w-[25px]">
            <Image
              src="/assets/icons/search.svg"
              alt="search-icon"
              fill={true}
              className="object-contain"
            />
          </div>
        </div>
        <Input className="h-[30px] rounded-r-lg border-none bg-slate-200 text-[10px] hover:bg-slate-300 focus:outline-none dark:bg-dark-100 dark:text-slate-100 dark:hover:bg-dark-100/70 sm:text-[12px] md:h-[34px] md:text-[14px] lg:h-[38px]" />
      </div>
      <div className="flex flex-col gap-4">
        {fetchedQuestions &&
          fetchedQuestions.map((question) => {
            return (
              <QuestionCard
                key={question._id}
                id={JSON.parse(JSON.stringify(question._id))}
                text={question.text}
                title={question.title}
                createdAt={question.createdAt}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
