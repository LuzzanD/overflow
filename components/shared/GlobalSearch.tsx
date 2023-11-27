"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const GlobalSearch = () => {
  return (
    <div className="flex h-[38px] w-[50%] rounded-lg">
      <div className="flex-center relative w-[50px] cursor-pointer rounded-l-lg bg-slate-200 hover:bg-slate-300 dark:bg-dark-100 dark:hover:bg-dark-100/70">
        <Image
          src="/assets/icons/search.svg"
          alt="search-icon"
          width={25}
          height={25}
        />
      </div>
      <Input
        placeholder="Ask for anything that bothers you."
        className="h-full rounded-r-lg border-none bg-slate-200 hover:bg-slate-300 focus:outline-none dark:bg-dark-100 dark:text-slate-100 dark:hover:bg-dark-100/70"
      />
    </div>
  );
};

export default GlobalSearch;
