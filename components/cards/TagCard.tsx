"use client";

import React from "react";
import Tag from "../shared/Tag";
import Link from "next/link";

interface TagCardProps {
  name: string;
  numberOfQuestions: number;
}
const TagCard = ({ name, numberOfQuestions }: TagCardProps) => {
  return (
    <Link href={`/tags/${name}`}>
      <div className=" flex h-[200px] w-[100%] flex-col items-start justify-between rounded-md border-2 bg-slate-100 px-2 py-4 dark:border-dark-100/70 dark:bg-dark-200/80 lg:px-3 lg:py-6">
        <Tag name={name} hasCloseButton={false} />
        <div className="flex items-center gap-1.5">
          <span className="bg-gradient-to-r from-[#5e60ce] to-[#4ea8de] bg-clip-text text-[12px] text-transparent dark:from-[#f28927] dark:to-[#ffd760] xl:text-[14px]">
            {numberOfQuestions}
          </span>
          <p className="text-[10px] dark:text-slate-100 xl:text-[11px]">
            {numberOfQuestions === 1 ? "Question" : "Questions"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TagCard;
