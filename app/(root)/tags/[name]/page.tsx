import React from "react";
import { getTagByName } from "@/lib/actions/tag.actions";
import QuestionCard from "@/components/cards/QuestionCard";
import { Schema } from "mongoose";
import Search from "@/components/shared/Search";

interface QuestionProps {
  _id: string;
  title: string;
  tags: { name: string }[];
  createdAt: string;
  author: {
    clerkId: string;
    name: string;
    profilePictureUrl: string;
  };
  views: number;
  upvotes: Schema.Types.ObjectId[];
  answers: Schema.Types.ObjectId[];
}

const TagDetail = async ({ params, searchParams }: any) => {
  const { name } = params;
  const fetchedQuestionsByTag = await getTagByName({ name });

  return (
    <div className="flex w-full flex-col gap-8">
      <h1 className="h2-bold xl:h1-bold mb-2 dark:text-slate-100">{name}</h1>
      <div className="flex h-[26px] rounded-lg sm:h-[30px] md:h-[34px] lg:h-[38px]">
        <Search />
      </div>
      <div className="flex flex-col gap-4">
        {fetchedQuestionsByTag.map((question: QuestionProps) => {
          const questionId = JSON.stringify(question._id);
          const dateString = JSON.stringify(question.createdAt);
          const tagArray = question.tags.map((tag) => tag.name);
          const { clerkId, name, profilePictureUrl } = question.author;

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
        })}
      </div>
    </div>
  );
};

export default TagDetail;
