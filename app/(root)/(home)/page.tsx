import React from "react";
import Image from "next/image";
import Link from "next/link";
import QuestionCard from "@/components/cards/QuestionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getQuestions } from "@/lib/actions/question.actions";

const Home = async () => {
  const fetchedQuestions = await getQuestions();

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="h2-bold xl:h1-bold mb-2 dark:text-slate-100">
          All questions
        </h1>
        <Link href="/ask-question">
          <Button className="primary-gradient dark:secondary-gradient text-[12px] text-white sm:px-6 sm:text-[13px] lg:px-10 lg:text-[14px]">
            Ask a question!
          </Button>
        </Link>
      </div>
      <div className="flex h-[26px] rounded-lg sm:h-[30px] md:h-[34px] lg:h-[38px]">
        <div className="flex-center cursor-pointer rounded-l-lg bg-slate-200 p-1 hover:bg-slate-300 dark:bg-dark-100 dark:hover:bg-dark-100/70 sm:p-2">
          <div className="relative aspect-square w-[16px] xs:w-[20px] md:w-[22px] lg:w-[25px]">
            <Image
              src="/assets/icons/search.svg"
              alt="search-icon"
              fill={true}
              className="object-contain"
            />
          </div>
        </div>
        <Input className="h-full rounded-r-lg border-none bg-slate-200 px-1 text-[10px] hover:bg-slate-300 focus:outline-none dark:bg-dark-100 dark:text-slate-100 dark:hover:bg-dark-100/70 sm:px-2 sm:text-[12px] md:text-[14px] lg:px-4" />
      </div>
      <div className="flex flex-col gap-4">
        {fetchedQuestions ? (
          fetchedQuestions.map((question) => {
            const parsedQuestionId = JSON.parse(JSON.stringify(question._id));
            const parsedDate = JSON.parse(JSON.stringify(question.createdAt));
            const { name, profilePictureUrl } = question.author;
            return (
              <QuestionCard
                key={parsedQuestionId}
                name={name}
                profilePictureUrl={profilePictureUrl}
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

export default Home;
