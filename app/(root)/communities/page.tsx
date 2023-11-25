import React from "react";
import { getAllUsers } from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";

const Communities = async () => {
  const allUsers = await getAllUsers();
  return (
    <div className="flex w-full flex-col gap-8">
      <h1 className="h1-bold mb-2 dark:text-slate-100">
        Ask a public question
      </h1>
      {allUsers ? (
        <div className="flex flex-wrap gap-2">
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
