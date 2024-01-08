import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="flex w-full flex-col gap-8">
      <h1 className="h2-bold xl:h1-bold mb-2 dark:text-slate-100">Community</h1>
      <div>
        <Skeleton className="h-[26px] rounded-lg sm:h-[30px] md:h-[34px] lg:h-[38px]" />
      </div>
      <div className="grid grid-cols-2 gap-3 xs:grid-cols-3 md:grid-cols-4 lg:gap-4 xl:grid-cols-5">
        {[
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ].map((number) => (
          <div
            key={number}
            className="flex h-[200px] w-[100%] flex-col items-center justify-between rounded-md border-2 bg-transparent px-2 pb-2 pt-6 dark:border-dark-100/70 lg:h-[220px] lg:pb-4 lg:pt-8"
          >
            <div>
              <Skeleton className="aspect-square w-[80px] rounded-full 2xl:w-[100px]" />
            </div>
            <div className="flex w-full flex-col items-center gap-2">
              <div className="w-[50%] rounded-md">
                <Skeleton className="h-[20px] w-full" />
              </div>
              <div className="w-[75%] rounded-md">
                <Skeleton className="h-[20px] w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default loading;
