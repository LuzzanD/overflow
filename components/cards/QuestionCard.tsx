import React from "react";
import Tag from "../shared/Tag";

const QuestionCard = () => {
  return (
    <div className="w-full rounded-md bg-slate-200 p-6">
      <h3 className="mb-2 text-[16px] font-semibold leading-[20.8px]">
        Question Title
      </h3>
      <div className="flex gap-2">
        {["javascript", "html", "react", "nextjs"].map((tag) => {
          return <Tag key={tag} name={tag} />;
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
