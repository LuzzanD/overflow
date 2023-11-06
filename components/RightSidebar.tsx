import React from "react";
import Image from "next/image";

const questions = [
  "I'm getting a 'NullPointerException' in my Java code. How can I debug and fix this issue?",
  "What are the best practices for optimizing SQL queries to improve database performance?",
  "I'm working on a Python project and encountered an 'IndentationError.' How can I resolve it, and what causes this error?",
  "How can I implement error handling and exception handling in my C# application to make it more robust and user-friendly?",
  "What are the key differences between object-oriented programming and functional programming, and when should I choose one over the other for a software project?",
];

const questionCard = questions.map((question) => {
  return (
    <div key={question} className="mb-2 flex items-center justify-between">
      <p className="small-regular w-[250px]">{question}</p>
      <Image
        className="object-contain"
        src="../public/assets/icons/chevron-right.svg"
        alt="shevron icon"
        width={15}
        height={15}
      />
    </div>
  );
});

const RightSideBar = () => {
  return (
    <section className="background-light800_dark400 flex h-full w-[25%] flex-col gap-4 p-4">
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
