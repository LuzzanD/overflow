"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery } from "@/lib/utils";

const FilterSelector = ({ filters }: { filters: string[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = (value: string) => {
    const url = formUrlQuery({
      searchParams: searchParams.toString(),
      value: value.toLowerCase(),
      key: "filter",
    });
    router.push(url, { scroll: false });
  };

  return (
    <div>
      <Select>
        <SelectTrigger className="h-[26px] w-[180px] rounded-lg border-none bg-slate-200 text-slate-900 hover:bg-slate-300 focus:outline-none sm:h-[30px] md:h-[34px] lg:h-[38px]">
          <SelectValue placeholder={filters[0]} />
        </SelectTrigger>
        <SelectContent className="bg-slate-200 text-slate-900">
          {filters.map((filter) => {
            return (
              <SelectItem
                key={filter}
                onClick={() => handleClick(filter.toLowerCase())}
                value={filter.toLowerCase()}
                className="hover:cursor-pointer hover:bg-slate-300"
              >
                {filter}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterSelector;
