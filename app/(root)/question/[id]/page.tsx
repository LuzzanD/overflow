import React from "react";
import Image from "next/image";
import Tag from "@/components/shared/Tag";
import VotingMetric from "@/components/shared/VotingMetric";
import { getQuestionById } from "@/lib/actions/question.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { IQuestion } from "@/database/QuestionModel";
import AnswerForm from "@/components/forms/AnswerForm";
import Answer from "@/components/shared/Answer";
import { Schema } from "mongoose";
import Metric from "@/components/shared/Metric";

const QuestionDetailsPage = async ({ params, searchParams }: any) => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const question = await getQuestionById({ id: params.id });
  const mongoUser = await getUserById({ userId: user.id });

  interface Props {
    userId: string;
    _id: string;
    text: string;
    author: {
      _id: string;
      name: string;
      profilePictureUrl: string;
    };
    views: number;
    upvotes: Schema.Types.ObjectId[];
    answers: Schema.Types.ObjectId[];
    downvotes: Schema.Types.ObjectId[];
    createdAt: Date;
  }

  const parsedQuestionId = question && JSON.parse(JSON.stringify(question._id));
  const parsedUserId = mongoUser && JSON.parse(JSON.stringify(mongoUser._id));

  const hasUserUpvoted = question.upvotes.includes(
    JSON.parse(JSON.stringify(parsedUserId))
  );
  const hasUserDownvoted = question.downvotes.includes(
    JSON.parse(JSON.stringify(parsedUserId))
  );

  const hasUserSaved = mongoUser.savedQuestions.some((element: IQuestion) => {
    const parsedElementId = JSON.parse(JSON.stringify(element._id));
    return parsedElementId === parsedQuestionId;
  });
  const questionAnswers = question.answers;

  return question && mongoUser ? (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="relative aspect-square w-[26px] overflow-hidden rounded-full bg-slate-200">
            <Image
              src={question.author ? question.author.profilePictureUrl : ""}
              alt="User profile picture"
              fill={true}
              className="object-cover"
            />
          </div>
          <p className="body-semibold dark:text-slate-100">
            {question.author.name}
          </p>
        </div>
        <div>
          <VotingMetric
            type="question"
            id={parsedQuestionId}
            userId={parsedUserId}
            upvotes={question.upvotes.length}
            downvotes={question.downvotes.length}
            hasUserUpvoted={hasUserUpvoted}
            hasUserDownvoted={hasUserDownvoted}
            hasUserSaved={hasUserSaved}
          />
        </div>
      </div>
      <h2 className="text-2xl font-semibold leading-[20.8px] dark:text-slate-100">
        {question.title}
      </h2>
      <div>
        <Metric
          views={question.views}
          upvoteNumber={question.upvotes.length}
          answersNumber={question.answers.length}
        />
      </div>
      <p className="body-regular dark:text-slate-100">{question.text}</p>
      <div>Code Sample</div>
      <div className="flex gap-2">
        {["javascript", "html", "react", "nextjs"].map((tag) => {
          return <Tag key={tag} name={tag} hasCloseButton={false} />;
        })}
      </div>
      <AnswerForm userId={parsedUserId} questionId={parsedQuestionId} />
      <div className="mt-4">
        {questionAnswers.map(
          (
            { _id, text, author, upvotes, downvotes, createdAt }: Props,
            index: number
          ) => {
            // const { _id, text, author, upvotes, downvotes, createdAt } = answer;
            const parsedAnswerId = JSON.parse(JSON.stringify(_id));
            return (
              <Answer
                key={index}
                userId={parsedUserId}
                answerId={parsedAnswerId}
                text={text}
                author={author}
                upvotes={upvotes}
                downvotes={downvotes}
                createdAt={createdAt}
              />
            );
          }
        )}
      </div>
    </div>
  ) : (
    <p>Something went wrong</p>
  );
};

export default QuestionDetailsPage;
