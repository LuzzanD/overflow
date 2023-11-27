import React from "react";
import Image from "next/image";
import chevronImage from "../public/assets/icons/chevron-right.svg";
import { getAllTags } from "@/lib/actions/tag.actions";
import { getQuestions } from "@/lib/actions/question.actions";
import Tag from "./shared/Tag";

const RightSideBar = async () => {
  const allTags = await getAllTags();
  const allQuestions = await getQuestions();

  const questionCards =
    allQuestions &&
    allQuestions.map((question) => {
      return (
        <div
          key={question}
          className="group mb-4 flex h-[65px] items-center justify-between rounded-lg bg-slate-200/90 p-2 hover:cursor-pointer hover:bg-slate-200/50 dark:bg-dark-100 hover:dark:bg-dark-100/50"
        >
          <p className="small-regular h-[100%] w-[90%] overflow-hidden text-ellipsis dark:text-slate-100 lg:w-[80%]">
            {question.text}
          </p>
          <Image
            src={chevronImage}
            alt="chevron icon"
            width={25}
            height={25}
            className="invert dark:invert-0"
          />
        </div>
      );
    });

  const tagCards =
    allTags &&
    allTags.map((tag, index) => {
      return (
        <div
          key={index}
          className="mb-4 flex items-center justify-between rounded-lg bg-slate-200/90 p-2 hover:cursor-pointer hover:bg-slate-200/50 dark:bg-dark-100 hover:dark:bg-dark-100/50"
        >
          <Tag name={tag.name} />
          <div className="small-semibold dark:text-slate-100">
            {tag.questions ? tag.questions.length : 0}
          </div>
        </div>
      );
    });
  return (
    <section className=" min-h-screen w-[100%] flex-col gap-4 bg-slate-50 p-4 pt-8 shadow-xl dark:bg-dark-200 dark:shadow-dark-100 sm:w-[25%]  lg:w-[20%]">
      <div>
        <h3 className="base-semibold mb-5 dark:text-slate-100">Hot Network</h3>
        <div>{questionCards}</div>
      </div>
      <div>
        <h3 className="base-semibold mb-5 dark:text-slate-100">Popular Tags</h3>
        <div>{tagCards}</div>
      </div>
    </section>
  );
};

export default RightSideBar;
