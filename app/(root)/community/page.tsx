import React from "react";
import UserCard from "@/components/cards/UserCard";
import { getAllUsers } from "@/lib/actions/user.actions";
import Link from "next/link";
import FilterSelector from "@/components/shared/FilterSelector";
import { communityFilters } from "@/constants";
import Search from "@/components/shared/Search";

const Community = async ({ searchParams }: any) => {
  const allUsers = await getAllUsers({ filter: searchParams.filter });

  return (
    <div className="flex w-full flex-col gap-8">
      <h1 className="h2-bold xl:h1-bold mb-2 dark:text-slate-100">Community</h1>
      <div className="flex w-full gap-4">
        <div className="h-[26px] w-full rounded-lg sm:h-[30px] md:h-[34px] lg:h-[38px]">
          <Search />
        </div>
        <div className="">
          <FilterSelector filters={communityFilters} />
        </div>
      </div>
      {allUsers ? (
        <div className="grid grid-cols-2 gap-3 xs:grid-cols-3 md:grid-cols-4 lg:gap-4 xl:grid-cols-5">
          {allUsers.map((user) => {
            return (
              <Link key={user.clerkId} href={`/profile/${user.clerkId}`}>
                <UserCard
                  profilePic={user.profilePictureUrl}
                  name={user.name}
                  username={user.username}
                />
              </Link>
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
