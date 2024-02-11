import React from "react";
import Link from "next/link";
import QuestionCard from "@/components/cards/QuestionCard";
import { Button } from "@/components/ui/button";
import { getQuestions } from "@/lib/actions/question.actions";
import { homePageFilters } from "@/constants";
import FilterTab from "@/components/shared/FilterTab";
import Pagination from "@/components/shared/Pagination";
import Search from "@/components/shared/Search";

const Home = async ({ searchParams }: any) => {
  const result = await getQuestions({
    filter: searchParams.filter,
    page: searchParams.page,
  });

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
      <div className="h-[26px] w-full rounded-lg sm:h-[30px] md:h-[34px] lg:h-[38px]">
        <Search />
      </div>
      <div className="flex w-full gap-4">
        {homePageFilters.map((filter) => {
          return <FilterTab key={filter} filter={filter} />;
        })}
      </div>
      <div className="flex flex-col gap-4">
        {result.allQuestions ? (
          result.allQuestions.map((question) => {
            const questionId = JSON.stringify(question._id);
            const dateString = JSON.stringify(question.createdAt);
            const tagArray = question.tags.map((tag: any) => tag.name);
            const { clerkId, name, profilePictureUrl } = question.author;
            // const authorId = JSON.stringify(clerkId);
            return (
              <QuestionCard
                key={questionId}
                id={questionId}
                title={question.title}
                tags={tagArray}
                createdAt={dateString}
                authorId={clerkId}
                author={name}
                profilePictureUrl={profilePictureUrl}
                views={question.views}
                upvoteNumber={question.upvotes.length}
                answersNumber={question.answers.length}
              />
            );
          })
        ) : (
          <div className="mt-8 w-[90%] text-center">
            Waiting for the questions...
          </div>
        )}
        <div className="mt-4">
          <Pagination isNext={result.isNext} />
        </div>
      </div>
    </div>
  );
};

export default Home;
