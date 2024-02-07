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
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={filters[0]} />
        </SelectTrigger>
        <SelectContent>
          {filters.map((filter) => {
            return (
              <SelectItem
                key={filter}
                onClick={() => handleClick(filter.toLowerCase())}
                value={filter.toLowerCase()}
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
