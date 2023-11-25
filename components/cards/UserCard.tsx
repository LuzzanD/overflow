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
      <div className=" flex h-[200px] w-1/5 flex-col items-center justify-between rounded-md border-2 bg-slate-100 px-2 py-4 pt-8 dark:border-dark-100/70 dark:bg-dark-400/10">
        <div className="relative h-1/2 w-1/2 rounded-full">
          <Image
            src={user.profilePictureUrl}
            alt="user profile pic"
            fill={true}
            className="object-contain"
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
