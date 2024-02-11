"use client";

import React, { useEffect } from "react";
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
  handleView,
} from "@/lib/actions/interaction.actions";
import { usePathname } from "next/navigation";
import { useToast } from "../ui/use-toast";

interface VotingParams {
  type: string;
  id: string;
  author: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  hasUserUpvoted: boolean;
  hasUserDownvoted: boolean;
  hasUserSaved?: boolean;
}

const VotingMetric = ({
  type,
  id,
  author,
  userId,
  upvotes,
  downvotes,
  hasUserUpvoted,
  hasUserDownvoted,
  hasUserSaved,
}: VotingParams) => {
  const path = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    handleView({ id: JSON.stringify(id), path });
  }, [userId, id, path]);

  const handleUpvoteClick = async () => {
    await handleUpvote({
      userId,
      id,
      author,
      type,
      path,
    });
    !hasUserUpvoted &&
      toast({
        description: `${
          type === "answer" ? "Answer" : "Question"
        } has been successfully upvoted!`,
      });
  };

  const handleDownvoteClick = async () => {
    await handleDownvote({
      userId,
      id,
      author,
      type,
      path,
    });
    !hasUserDownvoted &&
      toast({
        variant: "destructive",
        description: `${
          type === "answer" ? "Answer" : "Question"
        } has been successfully downvoted!`,
      });
  };

  const handleSaveClick = async () => {
    await handleSave({
      userId,
      id,
      path,
    });

    toast({
      variant: hasUserSaved ? "destructive" : "default",
      description: hasUserSaved
        ? "Question has been removed from the collection!"
        : "Question has been added to the collection!",
    });
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1.5">
        <div
          className="relative aspect-square w-[16px] hover:cursor-pointer sm:w-[18px] md:w-[20px] xl:w-[22px]"
          onClick={() => handleUpvoteClick()}
        >
          <Image
            src={hasUserUpvoted ? upvoted : upvote}
            alt="Upvote icon"
            fill={true}
          />
        </div>
        <div className="flex aspect-square w-[16px] items-center justify-center bg-slate-200 text-[9px] font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-200 sm:w-[18px] sm:text-[10px] md:w-[20px] md:text-[11px] xl:w-[22px] xl:text-[12px]">
          {upvotes}
        </div>
      </div>
      <div className="flex gap-1.5">
        <div
          className="relative aspect-square w-[16px] hover:cursor-pointer sm:w-[18px] md:w-[20px] xl:w-[22px]"
          onClick={() => handleDownvoteClick()}
        >
          <Image
            src={hasUserDownvoted ? downvoted : downvote}
            alt="Downvote icon"
            fill={true}
          />
        </div>

        <div className="flex aspect-square w-[16px] items-center justify-center bg-slate-200 text-[9px] font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-200 sm:w-[18px] sm:text-[10px] md:w-[20px] md:text-[11px] xl:w-[22px] xl:text-[12px]">
          {downvotes ? -downvotes : downvotes}
        </div>
      </div>
      {type === "question" && (
        <div
          className="relative aspect-square w-[15px] hover:cursor-pointer sm:w-[16px] md:w-[18px] xl:w-[20px]"
          onClick={() => handleSaveClick()}
        >
          <Image
            src={hasUserSaved ? filledStar : star}
            alt="Star icon"
            fill={true}
          />
        </div>
      )}
    </div>
  );
};

export default VotingMetric;
