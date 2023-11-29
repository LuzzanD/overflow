import { getQuestionById } from "@/lib/actions/question.actions";
import React from "react";

// interface Params {
//   id: string;
// }

const page = async ({ params, searchParams }: any) => {
  console.log(params.id);
  const question = await getQuestionById({ id: params.id });
  return question ? (
    <div className="">
      <div>
        <div>User pic and username</div>
        <div>Voting</div>
      </div>
      <h2>{question.title}</h2>
      <div>About question</div>
      <p>{question.explanation}</p>
      <div>Code Sample</div>
      <div>Tags</div>
    </div>
  ) : (
    <p>Something went wrong</p>
  );
};

export default page;
