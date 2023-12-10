"use client";

import React from "react";
import Image from "next/image";
import upvote from "../../public/assets/icons/upvote.svg";
import downvote from "../../public/assets/icons/downvote.svg";
import star from "../../public/assets/icons/star-red.svg";
import upvoted from "../../public/assets/icons/upvoted.svg";
import downvoted from "../../public/assets/icons/downvoted.svg";
import filledStar from "../../public/assets/icons/star-filled.svg";
import {
  handleUpvote,
  handleDownvote,
  handleSave,
} from "@/lib/actions/question.actions";
import { Schema } from "mongoose";
import { usePathname } from "next/navigation";

interface VotingParams {
  questionId: string;
  userId: string;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  savedQuestions: Schema.Types.ObjectId[];
}

const VotingMetric = ({
  questionId,
  userId,
  upvotes,
  downvotes,
  savedQuestions,
}: VotingParams) => {
  const path = usePathname();
  console.log(savedQuestions);

  const hasUserUpvoted = upvotes.includes(JSON.parse(JSON.stringify(userId)));
  const hasUserDownvoted = downvotes.includes(
    JSON.parse(JSON.stringify(userId))
  );
  const hasUserSaved = savedQuestions.includes(
    JSON.parse(JSON.stringify(questionId))
  );

  const handleUpvoteClick = async () => {
    await handleUpvote({
      userId,
      questionId,
      path,
    });
  };

  const handleDownvoteClick = async () => {
    await handleDownvote({
      userId,
      questionId,
      path,
    });
  };

  const handleSaveClick = async () => {
    await handleSave({
      userId,
      questionId,
      path,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-2">
        <div
          className="relative aspect-square w-[20px] hover:cursor-pointer"
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
          className="relative aspect-square w-[20px] hover:cursor-pointer"
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
        className="relative aspect-square w-[17px] hover:cursor-pointer"
        onClick={() => handleSaveClick()}
      >
        <Image
          src={hasUserSaved ? filledStar : star}
          alt="Star icon"
          fill={true}
        />
      </div>
    </div>
  );
};

export default VotingMetric;
