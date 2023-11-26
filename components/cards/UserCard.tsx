import React from "react";
import { getUserById } from "@/lib/actions/user.actions";
import Image from "next/image";

export interface Params {
  userId: string;
}

const UserCard = async ({ userId }: Params) => {
  const user = await getUserById({ userId });
  console.log(user);
  return (
    user && (
      <div className=" flex h-[220px] w-1/5 flex-col items-center justify-between rounded-md border-2 bg-slate-100 px-2 pb-4 pt-8 dark:border-dark-100/70 dark:bg-dark-400/10">
        <div className="relative aspect-square w-[100px] overflow-hidden rounded-full bg-slate-200">
          <Image
            src={user.profilePictureUrl}
            alt="user profile picture"
            fill={true}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="paragraph-semibold dark:text-slate-100">{user.name}</p>
          <span className="body-regular dark:text-slate-100">
            @{user.username}
          </span>
        </div>
      </div>
    )
  );
};

export default UserCard;