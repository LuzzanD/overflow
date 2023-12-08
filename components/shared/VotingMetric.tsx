"use client";

import React from "react";
import Image from "next/image";
import upvote from "../../public/assets/icons/upvote.svg";
import downvote from "../../public/assets/icons/downvote.svg";
import star from "../../public/assets/icons/star-red.svg";
import upvoted from "../../public/assets/icons/upvoted.svg";
import downvoted from "../../public/assets/icons/downvoted.svg";
// import filledStar from "../../public/assets/icons/star-filled.svg";
import { handleUpvote, handleDownvote } from "@/lib/actions/question.actions";
// import { IQuestion } from "@/database/QuestionModel";
import { Schema } from "mongoose";
import { usePathname } from "next/navigation";

interface VotingParams {
  questionId: string;
  userId: string;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
}

const VotingMetric = ({
  questionId,
  userId,
  upvotes,
  downvotes,
}: VotingParams) => {
  const path = usePathname();
  const handleUpvoteClick = async () => {
    await handleUpvote({
      userId: JSON.parse(userId),
      questionId: JSON.parse(questionId),
      path,
    });
  };

  const hasUserUpvoted = upvotes.find((id) => id === JSON.parse(userId));

  const handleDownvoteClick = async () => {
    await handleDownvote({
      userId: JSON.parse(userId),
      questionId: JSON.parse(questionId),
      path,
    });
  };

  const hasUserDownvoted = downvotes.find((id) => id === JSON.parse(userId));

  const handleSaveClick = () => {
    console.log("Hello");
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-2">
        <div
          className="relative aspect-square w-[20px]"
          onClick={() => handleUpvoteClick()}
        >
          <Image
            src={hasUserUpvoted ? upvoted : upvote}
            alt="Upvote icon"
            fill={true}
          />
        </div>
        <div className="small-semibold flex w-[20px] items-center justify-center bg-slate-400 px-3 py-1 text-slate-200">
          {upvotes.length}
        </div>
      </div>
      <div className="flex gap-2">
        <div
          className="relative aspect-square w-[20px]"
          onClick={() => handleDownvoteClick()}
        >
          <Image
            src={hasUserDownvoted ? downvoted : downvote}
            alt="Downvote icon"
            fill={true}
          />
        </div>

        <div className="small-semibold flex w-[20px] items-center justify-center bg-slate-400 px-3 py-1 text-slate-200">
          {downvotes.length}
        </div>
      </div>
      <div
        className="relative aspect-square w-[17px]"
        onClick={() => handleSaveClick()}
      >
        <Image src={star} alt="Star icon" fill={true} />
      </div>
    </div>
  );
};

export default VotingMetric;
