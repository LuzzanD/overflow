import React from "react";
import { getAllUsers } from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const Communities = async () => {
  const allUsers = await getAllUsers();
  return (
    <div className="flex w-full flex-col gap-8">
      <h1 className="h1-bold mb-2 dark:text-slate-100">
        Ask a public question
      </h1>
      <div className="flex w-full rounded-lg bg-slate-200/90">
        <div className="flex-center relative w-[50px] cursor-pointer rounded-l-lg hover:bg-transparent/5">
          <Image
            src="/assets/icons/search.svg"
            alt="search-icon"
            width={25}
            height={25}
          />
        </div>
        <Input className="rounded-r-lg border-none bg-transparent hover:bg-transparent/5 focus:outline-none" />
      </div>
      {allUsers ? (
        <div className="grid grid-cols-4 gap-4 xl:grid-cols-5">
          {allUsers.map(({ clerkId }) => {
            return <UserCard key={clerkId} userId={clerkId} />;
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

export default Communities;
