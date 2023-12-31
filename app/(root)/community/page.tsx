import React from "react";
import Image from "next/image";
import UserCard from "@/components/cards/UserCard";
import { Input } from "@/components/ui/input";
import { getAllUsers } from "@/lib/actions/user.actions";

const Community = async () => {
  const allUsers = await getAllUsers();
  return (
    <div className="flex w-full flex-col gap-8">
      <h1 className="h2-bold xl:h1-bold mb-2 dark:text-slate-100">Community</h1>
      <div className="flex h-[26px] rounded-lg sm:h-[30px] md:h-[34px] lg:h-[38px]">
        <div className="flex-center cursor-pointer rounded-l-lg bg-slate-200 p-1 hover:bg-slate-300 dark:bg-dark-100 dark:hover:bg-dark-100/70 sm:p-2">
          <div className="relative aspect-square w-[16px] xs:w-[20px] md:w-[22px] lg:w-[25px]">
            <Image
              src="/assets/icons/search.svg"
              alt="search-icon"
              fill={true}
              className="object-contain"
            />
          </div>
        </div>
        <Input className="h-full rounded-r-lg border-none bg-slate-200 px-1 text-[10px] hover:bg-slate-300 focus:outline-none dark:bg-dark-100 dark:text-slate-100 dark:hover:bg-dark-100/70 sm:px-2 sm:text-[12px] md:text-[14px] lg:px-4" />
      </div>
      {allUsers ? (
        <div className="grid grid-cols-2 gap-3 xs:grid-cols-3 md:grid-cols-4 lg:gap-4 xl:grid-cols-5">
          {allUsers.map((user) => {
            return (
              <UserCard
                key={user.clerkId}
                profilePic={user.profilePictureUrl}
                name={user.name}
                username={user.username}
              />
            );
          })}
        </div>
      ) : (
        <div>
          <p>There are no registered users.</p>
        </div>
      )}
    </div>
  );
};

export default Community;
