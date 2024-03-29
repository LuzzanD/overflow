"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Tag from "../shared/Tag";
import Metric from "../shared/Metric";
import { calculateTimePassed } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import deleteIcon from "../../public/assets/icons/trash.svg";
import editIcon from "../../public/assets/icons/edit.svg";
import { redirect, usePathname } from "next/navigation";
import { deleteQuestion } from "@/lib/actions/question.actions";
import { useToast } from "../ui/use-toast";

interface QuestionCardProps {
  id: string;
  title: string;
  authorId: string;
  tags: string[];
  createdAt: string;
  author: string;
  profilePictureUrl: string;
  views: number;
  upvoteNumber: number;
  answersNumber: number;
}

const QuestionCard = ({
  id,
  title,
  authorId,
  tags,
  createdAt,
  author,
  profilePictureUrl,
  views,
  upvoteNumber,
  answersNumber,
}: QuestionCardProps) => {
  const timeOfCreation = calculateTimePassed(JSON.parse(createdAt));
  const path = usePathname();
  const { user } = useUser();
  if (!user) redirect("sign-in");
  const { toast } = useToast();

  const handleDeleteClick = async () => {
    await deleteQuestion({
      questionId: JSON.parse(id),
      authorId,
      path,
    });
    toast({ description: "Question has been successfully deleted!" });
  };

  return (
    <Link href={`/question/${JSON.parse(id)}`}>
      <div className="flex w-full flex-col gap-4 rounded-md bg-slate-200/50 p-4 dark:bg-dark-100 md:p-5 lg:p-6">
        <div className="flex justify-between">
          <h3 className="text-[16px] font-semibold leading-[20.8px] dark:text-slate-100 md:text-[18px] lg:text-[20px] xl:text-[22px]">
            {title}
          </h3>
          {user.id === authorId && (
            <div className="flex items-baseline gap-3">
              <div
                className="relative aspect-square w-[16px]"
                onClick={handleDeleteClick}
              >
                <Image
                  src={deleteIcon}
                  alt="delete icon"
                  fill={true}
                  className="object-contain"
                />
              </div>

              <Link
                href={`/question/${JSON.parse(id)}/edit`}
                className="relative aspect-square w-[16px]"
              >
                <Image
                  src={editIcon}
                  alt="edit icon"
                  fill={true}
                  className="object-contain"
                />
              </Link>
            </div>
          )}
        </div>
        <div className="flex gap-3">
          {tags &&
            tags.map((name) => {
              return <Tag key={name} name={name} hasCloseButton={false} />;
            })}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 lg:gap-2">
            <div className="relative aspect-square w-[16px] overflow-hidden rounded-full sm:w-[18px] lg:w-[20px]">
              <Image
                alt="profile picture"
                src={profilePictureUrl}
                fill={true}
                className="object-fill"
              />
            </div>
            <Link
              href={`/profile/${authorId}`}
              className="flex items-center gap-1.5 lg:gap-2"
            >
              <p className="text-[11px] dark:text-slate-100 sm:text-[12px] md:text-[13px] xl:text-[14px]">
                {author}
              </p>
            </Link>
            <span className="ml-1 text-[8px] text-sky-600/80 sm:text-[9px] md:text-[10px] xl:text-[11px]">
              • asked {timeOfCreation}
            </span>
          </div>
          <Metric
            views={views}
            upvoteNumber={upvoteNumber}
            answersNumber={answersNumber}
          />
        </div>
      </div>
    </Link>
  );
};

export default QuestionCard;
