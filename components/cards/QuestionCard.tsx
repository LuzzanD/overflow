"use client";

import React from "react";
import Tag from "../shared/Tag";
import Metric from "../shared/Metric";
import Image from "next/image";
import UserPic from "../../public/assets/images/site-logo.svg";
import { calculateTimePassed } from "@/lib/utils";
import Link from "next/link";

interface Params {
  id: string;
  title: string;
  tags: string[];
  createdAt: string;
}

const QuestionCard = ({ id, title, tags, createdAt }: Params) => {
  const parsedDate = calculateTimePassed(createdAt);
  return (
    <Link href={`/question/${id}`}>
      <div className="flex w-full flex-col gap-4 rounded-md bg-slate-100 p-4 dark:bg-dark-100 md:p-5 lg:p-6">
        <h3 className="text-[16px] font-semibold leading-[20.8px] dark:text-slate-100 md:text-[18px] lg:text-[20px] xl:text-[22px]">
          {title}
        </h3>
        <div className="flex gap-2">
          {tags.map((tag) => {
            return <Tag key={tag} name={tag} />;
          })}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 lg:gap-2">
            <div className="relative aspect-square w-[16px] rounded-lg sm:w-[18px] lg:w-[20px]">
              <Image
                alt="profile picture"
                src={UserPic}
                fill={true}
                className="object-contain "
              />
            </div>
            <p className="text-[11px] dark:text-slate-100 sm:text-[12px] md:text-[13px] xl:text-[14px]">
              Username
            </p>
            <span className="text-[8px] dark:text-slate-100 sm:text-[10px] md:text-[11px] xl:text-[12px]">
              {parsedDate}
            </span>
          </div>
          <Metric />
        </div>
      </div>
    </Link>
  );
};

export default QuestionCard;
