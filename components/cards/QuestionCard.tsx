import React from "react";
import Tag from "../shared/Tag";
import Metric from "../shared/Metric";
import Image from "next/image";
import UserPic from "../../public/assets/images/site-logo.svg";
import { IQuestion } from "@/database/QuestionModel";
import { calculateTimePassed } from "@/lib/utils";

interface Params {
  question: IQuestion;
}

const QuestionCard = ({ question }: Params) => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-md bg-slate-100 p-6 dark:bg-dark-100">
      <h3 className="text-lg font-semibold leading-[20.8px] dark:text-slate-100">
        {question.title}
      </h3>
      <p className="body-regular dark:text-slate-100">{question.text}</p>
      <div className="flex gap-2">
        {["javascript", "html", "react", "nextjs"].map((tag) => {
          return <Tag key={tag} name={tag} />;
        })}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            alt="profile picture"
            src={UserPic}
            className="rounded-lg"
            width={20}
            height={20}
          />
          <p className="text-sm dark:text-slate-100">Username</p>
          <span className="text-xs dark:text-slate-100">
            {calculateTimePassed(
              JSON.parse(JSON.stringify(question.createdAt))
            )}
          </span>
        </div>
        <Metric />
      </div>
    </div>
  );
};

export default QuestionCard;
