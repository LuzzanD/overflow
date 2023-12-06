import { getAllTags } from "@/lib/actions/tag.actions";
import React from "react";
import TagCard from "@/components/cards/TagCard";
import { ITag } from "@/database/TagModel";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const Tags = async () => {
  const allTags = await getAllTags();
  return (
    <div className="flex w-full flex-col gap-8">
      <h1 className="h2-bold xl:h1-bold mb-2 dark:text-slate-100">Tags</h1>
      <div className="flex w-full rounded-lg bg-slate-200/90">
        <div className="flex-center relative w-[50px] cursor-pointer rounded-l-lg hover:bg-transparent/5">
          <Image
            src="/assets/icons/search.svg"
            alt="search-icon"
            width={25}
            height={25}
          />
        </div>
        <Input className="rounded-r-lg border-none bg-transparent hover:bg-transparent/5 focus:outline-none" />
      </div>
      <div className="grid grid-cols-2 gap-3 xs:grid-cols-3 md:grid-cols-4 lg:gap-4 xl:grid-cols-5">
        {allTags &&
          allTags.map((tag: ITag) => <TagCard key={tag.name} tag={tag} />)}
      </div>
    </div>
  );
};

export default Tags;
