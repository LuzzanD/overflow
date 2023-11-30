"use client";

import React from "react";
import Image from "next/image";
import upvote from "../../public/assets/icons/upvote.svg";
import downvote from "../../public/assets/icons/downvote.svg";
import star from "../../public/assets/icons/star-red.svg";
import { handleUpvote } from "@/lib/actions/interaction.actions";

interface VotingParams {
  upvotes: number;
  downvotes: number;
  userId: string;
  questionId: string;
}

const VotingMetric = ({
  upvotes,
  downvotes,
  userId,
  questionId,
}: VotingParams) => {
  const handleUpvoteClick = () => {
    handleUpvote({ userId, questionId });
  };

  const handleDownvoteClick = () => {
    console.log("Hello");
  };

  const handleSaveClick = () => {
    console.log("Hello");
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-2">
        <Image
          src={upvote}
          alt="Upvote icon"
          width={20}
          height={20}
          onClick={handleUpvoteClick}
        />
        <div className="small-semibold flex w-[20px] items-center justify-center bg-slate-400 px-3 py-1 text-slate-200">
          {upvotes}
        </div>
      </div>
      <div className="flex gap-2">
        <Image
          src={downvote}
          alt="Downvote icon"
          width={20}
          height={20}
          onClick={handleDownvoteClick}
        />
        <div className="small-semibold flex w-[20px] items-center justify-center bg-slate-400 px-3 py-1 text-slate-200">
          {downvotes}
        </div>
      </div>
      <div>
        <Image
          src={star}
          onClick={handleSaveClick}
          alt="Star icon"
          width={17}
          height={17}
        />
      </div>
    </div>
  );
};

export default VotingMetric;
