import React from "react";
import Image from "next/image";
import chevronImage from "../public/assets/icons/chevron-right.svg";

const questions = [
  "I'm getting a 'NullPointerException' in my Java code. How can I debug and fix this issue?",
  "What are the best practices for optimizing SQL queries to improve database performance?",
  "I'm working on a Python project and encountered an 'IndentationError.' How can I resolve it, and what causes this error?",
  "How can I implement error handling and exception handling in my C# application to make it more robust and user-friendly?",
  "What are the key differences between object-oriented programming and functional programming, and when should I choose one over the other for a software project?",
];

const questionCard = questions.map((question) => {
  return (
    <div
      key={question}
      className="group mb-4 flex items-center justify-between rounded-lg bg-slate-200/90 py-2 pl-4 hover:cursor-pointer hover:bg-slate-200/50"
    >
      <p className="small-regular w-[90%] lg:w-[80%]">{question}</p>
      <Image
        src={chevronImage}
        alt="chevron icon"
        width={25}
        height={25}
        className="invert"
      />
    </div>
  );
});

const RightSideBar = () => {
  return (
    <section className="flex min-h-screen w-[25%] flex-col gap-4 bg-slate-50 p-4 pt-8 shadow-xl dark:bg-slate-800 lg:w-[20%]">
      <div>
        <h3 className="base-semibold mb-5">Hot Network</h3>
        <div>{questionCard}</div>
      </div>
      <div>
        <h3 className="base-semibold mb-5">Popular Tags</h3>
        <div></div>
      </div>
    </section>
  );
};

export default RightSideBar;
