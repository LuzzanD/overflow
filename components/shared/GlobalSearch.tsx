"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const GlobalSearch = () => {
  return (
    <div className="flex h-[26px] rounded-lg sm:h-[30px] md:h-[34px] lg:h-[38px]">
      <div className="flex-center cursor-pointer rounded-l-lg bg-slate-200 p-1 hover:bg-slate-300 dark:bg-dark-100 dark:hover:bg-dark-100/70 sm:p-2">
        <div className="relative aspect-square w-[14px] xs:w-[16px] md:w-[22px] lg:w-[25px]">
          <Image
            src="/assets/icons/search.svg"
            alt="search-icon"
            fill={true}
            className="object-contain"
          />
        </div>
      </div>
      <Input
        placeholder="Ask for anything that bothers you."
        className="h-full rounded-r-lg border-none bg-slate-200 px-1 text-[10px] hover:bg-slate-300 focus:outline-none dark:bg-dark-100 dark:text-slate-100 dark:hover:bg-dark-100/70 sm:px-2 sm:text-[12px] md:text-[14px] lg:px-4"
      />
    </div>
  );
};

export default GlobalSearch;
