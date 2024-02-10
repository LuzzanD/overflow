"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface UserCardProps {
  clerkId: string;
  profilePic: string;
  name: string;
  username: string;
}

const UserCard = ({ clerkId, profilePic, name, username }: UserCardProps) => {
  return (
    <Link href={`/profile/${clerkId}`}>
      <div className="flex h-[200px] w-[100%] flex-col items-center justify-between rounded-md border-2 bg-slate-100 px-2 pb-2 pt-6 dark:border-dark-100/70 dark:bg-dark-200/80 lg:h-[220px] lg:pb-4 lg:pt-8">
        <div className="relative aspect-square w-[80px] overflow-hidden rounded-full bg-slate-200 2xl:w-[100px]">
          <Image
            src={profilePic}
            alt="user profile picture"
            fill={true}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-center text-[13px] font-semibold dark:text-slate-100 2xl:text-[14px]">
            {name}
          </span>
          <span className="mt-1 text-[12px] dark:text-slate-100">
            @{username}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
