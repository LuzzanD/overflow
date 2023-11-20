"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const GlobalSearch = () => {
  return (
    <div className="flex h-[38px] w-[50%] rounded-lg bg-slate-200">
      <div className="flex-center relative w-[50px] cursor-pointer rounded-l-lg hover:bg-transparent/5">
        <Image
          src="/assets/icons/search.svg"
          alt="search-icon"
          width={25}
          height={25}
        />
      </div>
      <Input className="rounded-r-lg bg-transparent hover:bg-transparent/5 focus:outline-none" />
    </div>
  );
};

export default GlobalSearch;
