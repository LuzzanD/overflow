import React from "react";
import Image from "next/image";
// import VotingMetric from "./VotingMetric";
import Tag from "./Tag";

interface Props {
  author: string;
  text: string;
}
const Answer = ({ author, text }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="relative aspect-square w-[26px] overflow-hidden rounded-full bg-slate-200">
            <Image
              src={""}
              alt="User profile picture"
              fill={true}
              className="object-cover"
            />
          </div>
          <p className="body-semibold dark:text-slate-100">username</p>
        </div>
        <div>
          {/* <VotingMetric
            answerId={parsedAnswerId}
            userId={parsedUserId}
            upvotes={upvotes}
            downvotes={downvotes}
            hasUserUpvoted={hasUserUpvoted}
            hasUserDownvoted={hasUserDownvoted}
          /> */}
        </div>
      </div>
      <div>About question</div>
      <p className="body-regular dark:text-slate-100">text</p>
      <div>Code Sample</div>
      <div className="flex gap-2">
        {["javascript", "html", "react", "nextjs"].map((tag) => {
          return <Tag key={tag} name={tag} />;
        })}
      </div>
    </div>
  );
};

export default Answer;
