import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import locationIcon from "../../../public/assets/icons/location.svg";
import linkIcon from "../../../public/assets/icons/link.svg";
import calendarIcon from "../../../public/assets/icons/calendar.svg";
import StatsCard from "@/components/cards/StatsCard";

import { getQuestionsByUserId } from "@/lib/actions/question.actions";
import ProfileTabs from "@/components/shared/ProfileTabs";
import { getAnswersByUserId } from "@/lib/actions/answer.actions";
import { convertDateFormat } from "@/lib/utils";

const Profile = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const {
    _id,
    name,
    username,
    portfolioLink,
    profilePictureUrl,
    locationString,
    joinedAt,
    bio,
  } = await getUserById({ userId });

  const questions = await getQuestionsByUserId({ id: _id });
  const answers = await getAnswersByUserId({ id: _id });
  const joinedAtDate = convertDateFormat(joinedAt);

  return (
    <div>
      <div className="flex gap-6">
        <div className="relative aspect-square w-[150px] overflow-hidden rounded-full border-[2px] border-slate-800 dark:border-slate-200">
          <Image
            src={profilePictureUrl && profilePictureUrl}
            alt="Profile picture"
            className="object-cover"
            fill={true}
          />
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex items-end justify-between">
            <h2 className="text-[20px] font-semibold dark:text-slate-100 sm:text-[22px] md:text-[24px] lg:text-[26px]">
              {name}
            </h2>
            <Link href="/profile/edit">
              <Button className="primary-gradient dark:secondary-gradient w-[150px] text-white transition-transform duration-300 hover:scale-110">
                Edit profile
              </Button>
            </Link>
          </div>
          <h3 className="mb-[5px] mt-[-15px] text-[10px] dark:text-slate-100 sm:text-[12px] md:text-[14px] lg:text-[16px]">
            @{username}
          </h3>
          <div className="flex items-center gap-1 md:gap-2 lg:gap-3">
            {portfolioLink && (
              <div className="flex gap-1.5">
                <div className="relative w-[15px]">
                  <Image
                    src={linkIcon}
                    alt="Link icon"
                    className="object-contain"
                    fill={true}
                  />
                </div>
                <Link href={`https://${portfolioLink}`} target="_blank">
                  <span className="text-[9px] text-sky-600 sm:text-[10px] md:text-[12px] xl:text-[13px]">
                    {portfolioLink}
                  </span>
                </Link>
              </div>
            )}
            {locationString && (
              <div className="flex gap-1.5">
                <div className="relative w-[15px]">
                  <Image
                    src={locationIcon}
                    alt="Location icon"
                    className="object-contain"
                    fill={true}
                  />
                </div>

                <span className="text-[9px] text-sky-600 sm:text-[10px] md:text-[12px] xl:text-[13px]">
                  {locationString}
                </span>
              </div>
            )}
            <div className="flex gap-1.5">
              <div className="relative w-[15px]">
                <Image
                  src={calendarIcon}
                  alt="Calendar icon"
                  className="object-contain"
                  fill={true}
                />
              </div>
              <span className="text-[9px] text-sky-600 sm:text-[10px] md:text-[12px] xl:text-[13px]">
                {joinedAtDate}
              </span>
            </div>
          </div>
          {bio && (
            <p className="mb-[5px] text-[10px] dark:text-slate-100 sm:text-[12px] md:text-[14px] lg:text-[16px]">
              {bio}
            </p>
          )}
        </div>
      </div>
      <div className="mt-16 flex flex-col gap-6">
        <h2 className="text-[20px] font-semibold dark:text-slate-200">Stats</h2>
        <div className="grid w-full grid-cols-4 gap-2">
          <div className="flex h-[60px] w-full items-center justify-around rounded-md bg-slate-200 px-4 py-2 dark:bg-slate-800">
            <span className="bg-gradient-to-r from-[#5e60ce] to-[#4ea8de] bg-clip-text font-semibold text-transparent dark:from-[#f28927] dark:to-[#ffd760]">
              {questions.length}{" "}
              {questions.length === 1 ? "Question" : "Questions"}
            </span>
            <span className="bg-gradient-to-r from-[#5e60ce] to-[#4ea8de] bg-clip-text font-semibold text-transparent dark:from-[#f28927] dark:to-[#ffd760]">
              {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
            </span>
          </div>
          <StatsCard />
          <StatsCard />
          <StatsCard />
        </div>
      </div>
      <ProfileTabs
        questions={questions && JSON.stringify(questions)}
        answers={answers && JSON.stringify(answers)}
      />
    </div>
  );
};

export default Profile;
