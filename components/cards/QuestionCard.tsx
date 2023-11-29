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
  text: string;
  title: string;
  createdAt: Date;
}

const QuestionCard = ({ id, text, title, createdAt }: Params) => {
  return (
    <Link href={`/question/${id}`}>
      <div className="flex w-full flex-col gap-4 rounded-md bg-slate-100 p-6 dark:bg-dark-100">
        <h3 className="text-lg font-semibold leading-[20.8px] dark:text-slate-100">
          {title}
        </h3>
        <p className="body-regular dark:text-slate-100">{text}</p>
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
            <p className="text-sm dark:text-slate-100">Username</p>
            <span className="text-xs dark:text-slate-100">
              {calculateTimePassed(JSON.parse(JSON.stringify(createdAt)))}
            </span>
          </div>
          <Metric />
        </div>
      </div>
    </Link>
  );
};

export default QuestionCard;
