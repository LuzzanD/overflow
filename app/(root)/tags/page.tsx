import React from "react";
import TagCard from "@/components/cards/TagCard";
import { getAllTags } from "@/lib/actions/tag.actions";
import Link from "next/link";
import { Schema } from "mongoose";
import FilterSelector from "@/components/shared/FilterSelector";
import { tagsFilters } from "@/constants";
import Search from "@/components/shared/Search";

interface Props {
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
          <Search />
        </div>
        <div className="">
          <FilterSelector filters={tagsFilters} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 xs:grid-cols-3 md:grid-cols-4 lg:gap-4 xl:grid-cols-5">
        {allTags ? (
          allTags.map((tag: Props) => (
            <Link key={tag.name} href={`/tags/${tag.name}`}>
              <TagCard
                name={tag.name}
                numberOfQuestions={tag.questions.length}
              />
            </Link>
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
