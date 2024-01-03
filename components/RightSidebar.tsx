import React from "react";
import Image from "next/image";
import Tag from "./shared/Tag";
import chevronImage from "../public/assets/icons/chevron-right.svg";
import { getAllTags } from "@/lib/actions/tag.actions";
import { getQuestions } from "@/lib/actions/question.actions";
import Link from "next/link";

const RightSideBar = async () => {
  const allTags = await getAllTags();
  const allQuestions = await getQuestions();

  const questionCards =
    allQuestions &&
    allQuestions.slice(0, 5).map((question) => {
      return (
        <Link
          key={JSON.stringify(question._id)}
          href={`/question/${question._id}`}
        >
          <div className="group mb-4 flex h-[65px] items-center justify-between rounded-lg bg-slate-200/90 p-2 pr-0 hover:cursor-pointer hover:bg-slate-200/50 dark:bg-dark-100 hover:dark:bg-dark-100/50 lg:pr-1 xl:pr-2">
            <p className="h-[100%] w-[90%] overflow-hidden text-ellipsis text-[9px] dark:text-slate-100 lg:w-[80%] lg:text-[10px] xl:text-[12px]">
              {question.text}
            </p>
            <div className="relative h-[18px] w-[18px] lg:h-[20px] lg:w-[20px] xl:h-[22px] xl:w-[22px]">
              <Image
                src={chevronImage}
                alt="chevron icon"
                fill={true}
                className="object-contain invert dark:invert-0"
              />
            </div>
          </div>
        </Link>
      );
    });

  const tagCards =
    allTags &&
    allTags.map((tag) => {
      return (
        <div
          key={tag.name}
          className="mb-4 flex items-center justify-between rounded-lg bg-slate-200/90 p-1.5 hover:cursor-pointer hover:bg-slate-200/50 dark:bg-dark-100 hover:dark:bg-dark-100/50 lg:p-2"
        >
          <Tag name={tag.name} hasCloseButton={false} />
          <div className="text-[14px] dark:text-slate-100">
            {tag.questions ? tag.questions.length : 0}
          </div>
        </div>
      );
    });
  return (
    <section className="min-h-screen w-[100%] flex-col gap-4 bg-slate-50 p-3 pt-6 shadow-xl dark:bg-dark-200 dark:shadow-dark-100 sm:w-[25%] md:p-4 md:pt-8 lg:w-[24%] 2xl:w-[20%]">
      <div>
        <h3 className="paragraph-semibold xl:base-semibold mb-3 dark:text-slate-100 lg:mb-4 xl:mb-5">
          Hot Network
        </h3>
        <div>{questionCards}</div>
      </div>
      <div>
        <h3 className="paragraph-semibold xl:base-semibold mb-3 dark:text-slate-100 lg:mb-4 xl:mb-5">
          Popular Tags
        </h3>
        <div>{tagCards}</div>
      </div>
    </section>
  );
};

export default RightSideBar;
