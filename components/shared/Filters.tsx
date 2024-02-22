"use client";

import React, { useState } from "react";
import { homePageFilters } from "@/constants";
import FilterTab from "@/components/shared/FilterTab";

const Filters = () => {
  const [active, setActive] = useState(0);
  return (
    <div className="flex w-full gap-4">
      {homePageFilters.map((filter, index) => {
        return (
          <FilterTab
            key={filter}
            filter={filter}
            index={index}
            setActive={setActive}
            active={active}
          />
        );
      })}
    </div>
  );
};

export default Filters;
