"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

interface TagProps {
  name: string;
  hasCloseButton: boolean;
  handleTagClose?: (name: string) => void;
}

const Tag = ({ name, hasCloseButton, handleTagClose }: TagProps) => {
  return (
    <Badge
      variant="outline"
      className="rounded-md border-none bg-slate-300 px-3 py-1 text-[11px] text-slate-600 shadow-sm shadow-slate-500 hover:cursor-pointer hover:bg-slate-300/50 dark:bg-slate-700 dark:text-slate-100 dark:shadow-none hover:dark:bg-dark-400/40 lg:text-[13px]"
    >
      {name}
      {hasCloseButton && (
        <div
          className="ml-4 text-black"
          onClick={() => handleTagClose && handleTagClose(name)}
        >
          x
        </div>
      )}
    </Badge>
  );
};

export default Tag;
