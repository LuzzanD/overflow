import React from "react";
import TagCard from "@/components/cards/TagCard";
import FilterSelector from "@/components/shared/FilterSelector";
import Search from "@/components/shared/Search";
import { Schema } from "mongoose";
import { tagsFilters } from "@/constants";
import { getAllTags } from "@/lib/actions/tag.actions";

interface TagProps {
  name: string;
  questions: Schema.Types.ObjectId[];
}

const Tags = async ({ searchParams }: any) => {
  const allTags = await getAllTags({ filter: searchParams.filter });
  return (
    <div className="flex w-full flex-col gap-8">
      <h1 className="h2-bold xl:h1-bold mb-2 dark:text-slate-100">Tags</h1>
      <div className="flex w-full gap-4">
        <div className="h-[26px] w-full rounded-lg sm:h-[30px] md:h-[34px] lg:h-[38px]">
          <Search placeholder="Search for tags." />
        </div>
        <div className="">
          <FilterSelector filters={tagsFilters} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 xs:grid-cols-3 md:grid-cols-4 lg:gap-4 xl:grid-cols-5">
        {allTags ? (
          allTags.map((tag: TagProps) => (
            <TagCard
              key={tag.name}
              name={tag.name}
              numberOfQuestions={tag.questions.length}
            />
          ))
        ) : (
          <div>
            <p>There are no saved tags.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tags;
