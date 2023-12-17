import React from "react";

// import Image from "next/image";
// import VotingMetric from "./VotingMetric";
// import { IUser } from "@/database/UserModel";
// import { getAnswerById } from "@/lib/actions/answer.actions";

interface Props {
  //   answerId: string;
  //   userId: string;
  //   answerId: string;
  //   author: IUser;
  text: string;
  //   upvotes: IUser[];
  //   downvotes: IUser[];
  //   createdAt: Date;
}
const Answer = async ({
  //   answerId,
  //   upvotes,
  text, //   userId,
  //   downvotes,
} //   author,
//   createdAt,
: Props) => {
  console.log(text);
  //   const answerData = await getAnswerById(JSON.parse(JSON.stringify(answerId)));
  //   const parsedAnswerId = answerId && JSON.parse(JSON.stringify(answerId));

  //   console.log(answerData);

  //   const hasUserUpvoted = upvotes.includes(JSON.parse(JSON.stringify(userId)));
  //   const hasUserDownvoted = downvotes.includes(
  //     JSON.parse(JSON.stringify(userId))
  //   );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="relative aspect-square w-[26px] overflow-hidden rounded-full bg-slate-200">
            {/* <Image
              src="../../public/assets/images/site-logo.svg"
              alt="User profile picture"
              fill={true}
              className="object-cover"
            /> */}
          </div>
          <p className="body-semibold dark:text-slate-100">username</p>
        </div>
        {/* <div>
          <VotingMetric
            id={parsedAnswerId}
            type="asnwer"
            userId={userId}
            upvotes={upvotes.length}
            downvotes={downvotes.length}
            hasUserUpvoted={hasUserUpvoted}
            hasUserDownvoted={hasUserDownvoted}
          />
        </div> */}
      </div>
      <div>About question</div>
      <p className="body-regular dark:text-slate-100">{text}</p>
      <div>Code Sample</div>
    </div>
  );
};

export default Answer;
