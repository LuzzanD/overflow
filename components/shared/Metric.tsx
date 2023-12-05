import React from "react";
import Image from "next/image";
import upvote from "../../public/assets/icons/like.svg";
import comment from "../../public/assets/icons/message.svg";
import eye from "../../public/assets/icons/eye.svg";

const Metric = () => {
  return (
    <div className="flex gap-3">
      <div className="flex items-center gap-[3px]">
        <Image alt="metric icon" src={upvote} height={14} width={14} />
        <p className="text-[10px] text-sky-600 xl:text-[12px]">1.2k Votes</p>
      </div>
      <div className="flex items-center gap-[3px]">
        <Image alt="metric icon" src={comment} height={14} width={14} />
        <p className="text-[10px] text-sky-600 xl:text-[12px]">900 Answers</p>
      </div>
      <div className="flex items-center gap-[3px]">
        <Image alt="metric icon" src={eye} height={14} width={14} />
        <p className="text-[10px] text-sky-600 xl:text-[12px]">5.2k Views</p>
      </div>
    </div>
  );
};

export default Metric;
