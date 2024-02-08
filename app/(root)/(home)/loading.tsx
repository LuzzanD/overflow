import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="h2-bold xl:h1-bold mb-2 dark:text-slate-100">
          All questions
        </h1>
      </div>
      <div>
        <Skeleton className="h-[26px] rounded-lg sm:h-[30px] md:h-[34px] lg:h-[38px]" />
      </div>
      <div className="flex w-full gap-4">
        {[1, 2, 3, 4].map((number) => {
          return (
            <Skeleton
              key={number}
              className="h-[40px] w-[100px] rounded-lg border-none"
            />
          );
        })}
      </div>
      <div className="flex flex-col gap-4">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <Skeleton key={number} className="h-[160px] w-full" />
        ))}
      </div>
    </div>
  );
};

export default loading;
