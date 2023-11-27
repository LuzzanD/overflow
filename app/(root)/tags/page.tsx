import { getAllTags } from "@/lib/actions/tag.actions";
import React from "react";
import TagCard from "@/components/cards/TagCard";
import { ITag } from "@/database/TagModel";

const Tags = async () => {
  const allTags = await getAllTags();
  return (
    <div className="flex w-full flex-col gap-8">
      <h1 className="h1-bold mb-2 dark:text-slate-100">Tags</h1>
      <div className="flex flex-wrap gap-4">
        {allTags &&
          allTags.map((tag: ITag) => <TagCard key={tag.name} tag={tag} />)}
      </div>
    </div>
  );
};

export default Tags;
