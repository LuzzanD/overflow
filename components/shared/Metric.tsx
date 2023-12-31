import React from "react";
import Image from "next/image";
import upvote from "../../public/assets/icons/like.svg";
import comment from "../../public/assets/icons/message.svg";
import eye from "../../public/assets/icons/eye.svg";

interface Props {
  views: number;
  answersNumber: number;
  upvoteNumber: number;
}
const Metric = ({ views, answersNumber, upvoteNumber }: Props) => {
  return (
    <div className="flex gap-1.5 md:gap-2 lg:gap-3">
      <div className="flex items-center gap-[3px]">
        <Image alt="metric icon" src={upvote} height={14} width={14} />
        <p className="text-[9px] text-sky-600 sm:text-[10px] md:text-[11px] xl:text-[12px]">
          {upvoteNumber === 1
            ? `${upvoteNumber} Vote`
            : `${upvoteNumber} Votes`}
        </p>
      </div>
      <div className="flex items-center gap-[3px]">
        <Image alt="metric icon" src={comment} height={14} width={14} />
        <p className="text-[9px] text-sky-600 sm:text-[10px] md:text-[11px] xl:text-[12px]">
          {answersNumber} Answers
        </p>
      </div>
      <div className="flex items-center gap-[3px]">
        <Image alt="metric icon" src={eye} height={14} width={14} />
        <p className="text-[9px] text-sky-600 sm:text-[10px] md:text-[11px] xl:text-[12px]">
          {views} views
        </p>
      </div>
    </div>
  );
};

export default Metric;
