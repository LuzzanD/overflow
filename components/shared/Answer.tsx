import React from "react";

import Image from "next/image";
import VotingMetric from "./VotingMetric";
import { Schema } from "mongoose";
// import { calculateTimePassed } from "@/lib/utils";

interface Props {
  userId: string;
  answerId: string;
  text: string;
  author: {
    _id: string;
    name: string;
    profilePictureUrl: string;
  };
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  createdAt: Date;
}
const Answer = async ({
  userId,
  answerId,
  text,
  author,
  upvotes,
  downvotes,
  createdAt,
}: Props) => {
  const dateObject = new Date(createdAt);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1; // Month is zero-based
  const day = dateObject.getDate();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();

  const hasUserUpvoted = upvotes.includes(JSON.parse(JSON.stringify(userId)));
  const hasUserDownvoted = downvotes.includes(
    JSON.parse(JSON.stringify(userId))
  );

  return (
    <div className="flex h-[150px] flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="relative aspect-square w-[26px] overflow-hidden rounded-full bg-slate-200">
            <Image
              src={
                author.profilePictureUrl
                  ? author.profilePictureUrl
                  : "../../public/assets/images/site-logo.svg"
              }
              alt="User profile picture"
              fill={true}
              className="object-cover"
            />
          </div>
          <p className="body-semibold dark:text-slate-100">{author.name}</p>
          <span className="text-[9px] text-sky-600 sm:text-[10px] md:text-[11px] xl:text-[12px]">
            - answered {year}-{month}-{day} {hours}:{minutes}:{seconds}
          </span>
        </div>
        <div>
          <VotingMetric
            id={answerId}
            type="answer"
            userId={userId}
            upvotes={upvotes.length}
            downvotes={downvotes.length}
            hasUserUpvoted={hasUserUpvoted}
            hasUserDownvoted={hasUserDownvoted}
          />
        </div>
      </div>
      <p className="body-regular w-[90%] dark:text-slate-100">{text}</p>
      <div>Code Sample</div>
      <div className="h-[1px] w-full bg-slate-300 dark:bg-slate-900"></div>
    </div>
  );
};

export default Answer;
