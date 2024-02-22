"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { formUrlQuery } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";

interface Props {
  filter: string;
  index: number;
  setActive: (index: number) => void;
  active: number;
}

const FilterTab = ({ filter, index, setActive, active }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = () => {
    const url = formUrlQuery({
      searchParams: searchParams.toString(),
      value: filter.toLowerCase(),
      key: "filter",
    });
    router.push(url, { scroll: false });
    setActive(index);
  };

  return (
    <Button
      className={`${
        active === index
          ? "bg-orange-100 text-orange-400 hover:cursor-default hover:bg-orange-100"
          : "bg-slate-200 text-slate-500 hover:cursor-pointer hover:bg-slate-200/50"
      } rounded-lg border-none px-4 py-3 text-[12px] shadow-sm shadow-slate-400 dark:bg-slate-800 dark:text-slate-200 dark:shadow-sm dark:shadow-slate-600 hover:dark:bg-slate-800/60 lg:text-[13px]`}
      onClick={() => handleClick()}
    >
      {filter}
    </Button>
  );
};

export default FilterTab;
