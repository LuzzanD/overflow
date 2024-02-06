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

const FilterSelector = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleClick = (value: string) => {
    const url = formUrlQuery({
      searchParams: searchParams.toString(),
      filterName: value.toLowerCase(),
      key: "filter",
    });
    router.push(url, { scroll: false });
  };
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Popular" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem onClick={() => handleClick("popular")} value="popular">
            Popular
          </SelectItem>
          <SelectItem
            onClick={() => handleClick("highest reputation")}
            value="highest reputation"
          >
            Highest Reputation
          </SelectItem>
          <SelectItem
            onClick={() => handleClick("moderators")}
            value="moderators"
          >
            Moderators
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterSelector;
