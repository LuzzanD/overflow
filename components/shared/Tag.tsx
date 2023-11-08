import React from "react";
import { Badge } from "@/components/ui/badge";

interface ITag {
  name: string;
}

const Tag = ({ name }: ITag) => {
  return (
    <div>
      <Badge
        variant="outline"
        className="rounded-md bg-slate-300 px-3 py-1 text-[10px] text-slate-500 hover:cursor-pointer"
      >
        {name}
      </Badge>
    </div>
  );
};

export default Tag;
