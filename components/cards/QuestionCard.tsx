import React from "react";
import Tag from "../shared/Tag";
import Metric from "../shared/Metric";
import Image from "next/image";
import UserPic from "../../public/assets/images/site-logo.svg";

const QuestionCard = () => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-md bg-slate-200 p-6">
      <h3 className="text-lg font-semibold leading-[20.8px]">Question Title</h3>
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
          <p className="text-sm">Username</p>
          <span className="text-xs">created since</span>
        </div>
        <Metric />
      </div>
    </div>
  );
};

export default QuestionCard;
