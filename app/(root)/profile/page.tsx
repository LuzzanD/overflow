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

const Profile = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const {
    name,
    username,
    portfolioLink,
    profilePictureUrl,
    locationString,
    bio,
  } = await getUserById({ userId });

  const questions = await getQuestionsByUserId({ id: userId });
  console.log(userId);

  return (
    <div>
      <div className="flex gap-6">
        <div className="relative aspect-square w-[150px] overflow-hidden rounded-full border-[2px] border-slate-800 dark:border-slate-200">
          <Image
            src={profilePictureUrl}
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
              <Button className="primary-gradient dark:secondary-gradient w-[150px] text-white">
                Edit profile
              </Button>
            </Link>
          </div>
          <h3 className="mb-[5px] mt-[-15px] text-[10px] dark:text-slate-100 sm:text-[12px] md:text-[14px] lg:text-[16px]">
            @{username}
          </h3>
          <div className="flex items-center gap-1 md:gap-2 lg:gap-3">
            <div className="flex gap-1">
              <div className="relative w-[15px]">
                <Image
                  src={linkIcon}
                  alt="Link icon"
                  className="object-contain"
                  fill={true}
                />
              </div>
              <Link href={portfolioLink} target="_blank">
                <span className="text-[9px] text-sky-600 sm:text-[10px] md:text-[12px] xl:text-[14px]">
                  {portfolioLink}
                </span>
              </Link>
            </div>
            <div className="flex gap-1">
              <div className="relative w-[15px]">
                <Image
                  src={locationIcon}
                  alt="Location icon"
                  className="object-contain"
                  fill={true}
                />
              </div>

              <span className="text-[9px] text-sky-600 sm:text-[10px] md:text-[12px] xl:text-[14px]">
                {locationString}
              </span>
            </div>
            <div className="flex gap-1">
              <div className="relative w-[15px]">
                <Image
                  src={calendarIcon}
                  alt="Calendar icon"
                  className="object-contain"
                  fill={true}
                />
              </div>
              <span className="text-[9px] text-sky-600 sm:text-[10px] md:text-[12px] xl:text-[14px]"></span>
            </div>
          </div>
          <p className="mb-[5px] text-[10px] dark:text-slate-100 sm:text-[12px] md:text-[14px] lg:text-[16px]">
            {bio}
          </p>
        </div>
      </div>
      <div className="mt-16 flex flex-col gap-6">
        <h2 className="text-[20px] font-semibold dark:text-slate-200">Stats</h2>
        <div className="grid w-full grid-cols-4 gap-2">
          <StatsCard />
          <StatsCard />
          <StatsCard />
          <StatsCard />
        </div>
      </div>
      <ProfileTabs questions={JSON.stringify(questions)} />
    </div>
  );
};

export default Profile;
