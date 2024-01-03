import React from "react";
import { getTagByName } from "@/lib/actions/tag.actions";
import QuestionCard from "@/components/cards/QuestionCard";
import { Schema } from "mongoose";

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
  console.log(name);

  return (
    <div>
      <h1 className="h2-bold xl:h1-bold mb-12 dark:text-slate-100">{name}</h1>
      <div className="flex flex-col gap-4">
        {fetchedQuestionsByTag.map((question: QuestionProps) => {
          const questionId = JSON.stringify(question._id);
          const dateString = JSON.stringify(question.createdAt);
          const { clerkId, name, profilePictureUrl } = question.author;
          const authorId = JSON.stringify(clerkId);

          return (
            <QuestionCard
              key={questionId}
              id={questionId}
              title={question.title}
              tags={question.tags}
              createdAt={dateString}
              authorId={authorId}
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
