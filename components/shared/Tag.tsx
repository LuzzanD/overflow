"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

interface TagProps {
  name: string;
  changeable?: any;
  handleTagClose?: (name: string) => void;
}

const Tag = ({ name, changeable, handleTagClose }: TagProps) => {
  return (
    <Badge
      variant="outline"
      className="subtle-medium lg:small-regular rounded-md border-none bg-slate-300 px-3 py-1 text-[10px] text-slate-600 hover:cursor-pointer hover:bg-slate-300/50 dark:bg-dark-400 dark:text-slate-100 hover:dark:bg-dark-400/40"
    >
      {name}
      {changeable && (
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
