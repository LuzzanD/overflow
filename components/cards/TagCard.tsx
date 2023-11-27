import React from "react";
import Tag from "../shared/Tag";

interface TagCardProps {
  tag: {
    name: string;
    explanation: string;
    questions: string[];
  };
}
const TagCard = ({ tag }: TagCardProps) => {
  return (
    <div className=" flex h-[220px] w-1/5 flex-col items-start justify-between rounded-md border-2 bg-slate-100 px-4 py-6 dark:border-dark-100/70 dark:bg-dark-200/80">
      <Tag name={tag.name} />
      <p className="small-regular dark:text-slate-100">{tag.explanation}</p>
      <div className="flex items-center gap-1.5">
        <span className="body-semibold bg-gradient-to-r from-[#5e60ce] to-[#4ea8de] bg-clip-text text-transparent dark:from-[#f28927] dark:to-[#ffd760]">
          2555+
        </span>
        <p className="small-regular dark:text-slate-100">Questions</p>
      </div>
    </div>
  );
};

export default TagCard;
