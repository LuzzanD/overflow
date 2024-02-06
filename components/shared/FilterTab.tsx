"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { formUrlQuery } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";

const FilterTab = ({ filter }: { filter: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = () => {
    const url = formUrlQuery({
      searchParams: searchParams.toString(),
      filterName: filter.toLowerCase(),
      key: "filter",
    });
    router.push(url, { scroll: false });
  };
  return (
    <Button
      className="rounded-lg border-none bg-slate-200 px-4 py-3 text-[13px] text-slate-500 shadow-sm shadow-slate-400 hover:cursor-pointer hover:bg-slate-200/50 dark:bg-slate-800 dark:text-slate-200 dark:shadow-sm dark:shadow-slate-600 hover:dark:bg-slate-800/60 lg:text-[14px]"
      onClick={() => handleClick()}
    >
      {filter}
    </Button>
  );
};

export default FilterTab;
