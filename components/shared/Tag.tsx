import React from "react";
import { Badge } from "@/components/ui/badge";

interface ITag {
  name: String;
}

const Tag = ({ name }: ITag) => {
  return (
    <div>
      <Badge
        variant="outline"
        className="small-regular rounded-md border-none bg-slate-300 px-3 py-1 text-[10px] text-slate-600 hover:cursor-pointer hover:bg-slate-300/50 dark:bg-dark-400 dark:text-slate-100 hover:dark:bg-dark-400/40"
      >
        {name}
      </Badge>
    </div>
  );
};

export default Tag;
