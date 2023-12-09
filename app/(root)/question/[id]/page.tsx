import Tag from "@/components/shared/Tag";
import { getQuestionById } from "@/lib/actions/question.actions";
import React from "react";
import Image from "next/image";
import VotingMetric from "@/components/shared/VotingMetric";
import { getUserById } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// interface Params {
//   id: string;
// }

const page = async ({ params, searchParams }: any) => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const question = await getQuestionById({ id: params.id });
  const mongoUser = await getUserById({ userId: user.id });

  // const questionId = JSON.parse(JSON.stringify(question._id));
  // const userId = JSON.parse(JSON.stringify(mongoUser._id));

  return question.author ? (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="relative aspect-square w-[26px] overflow-hidden rounded-full bg-slate-200">
            <Image
              src={question.author ? question.author.profilePictureUrl : ""}
              alt="User profile picture"
              fill={true}
              className="object-cover"
            />
          </div>
          <p className="body-semibold dark:text-slate-100">
            {question.author.username}
          </p>
        </div>
        <div>
          <VotingMetric
            questionId={question._id}
            userId={mongoUser._id}
            upvotes={question.upvotes}
            downvotes={question.downvotes}
          />
        </div>
      </div>
      <h2 className="text-2xl font-semibold leading-[20.8px] dark:text-slate-100">
        {question.title}
      </h2>
      <div>About question</div>
      <p className="body-regular dark:text-slate-100">{question.text}</p>
      <div>Code Sample</div>
      <div className="flex gap-2">
        {["javascript", "html", "react", "nextjs"].map((tag) => {
          return <Tag key={tag} name={tag} />;
        })}
      </div>
    </div>
  ) : (
    <p>Something went wrong</p>
  );
};

export default page;
