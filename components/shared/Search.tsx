"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { formUrlQuery, removeUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SearchFormSchema = z.object({
  searchValue: z.string().min(2, {
    message: "Search phrase must be at least 2 characters.",
  }),
});

const Search = ({ placeholder }: { placeholder: string }) => {
  const [search, setSearch] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const form = useForm<z.infer<typeof SearchFormSchema>>({
    resolver: zodResolver(SearchFormSchema),
    defaultValues: {
      searchValue: "",
    },
  });

  useEffect(() => {
    const delayedSearchFn = setTimeout(() => {
      if (search) {
        const url = formUrlQuery({
          searchParams: searchParams.toString(),
          value: search.toLowerCase(),
          key: "q",
        });
        router.push(url, { scroll: false });
      } else if (query && !search) {
        const url = removeUrlQuery({
          searchParams: searchParams.toString(),
          key: "q",
        });
        router.push(url, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(delayedSearchFn);
  }, [router, search]);

  return (
    <div className="flex h-[26px] rounded-lg sm:h-[30px] md:h-[34px] lg:h-[38px]">
      <div className="flex-center cursor-pointer rounded-l-lg bg-slate-200 p-1 hover:bg-slate-300 dark:bg-dark-100 dark:hover:bg-dark-100/70 sm:p-2">
        <div className="relative aspect-square w-[16px] xs:w-[20px] md:w-[22px] lg:w-[25px]">
          <Image
            src="/assets/icons/search.svg"
            alt="search-icon"
            fill={true}
            className="object-contain"
          />
        </div>
      </div>
      <div className="h-full w-full">
        <Form {...form}>
          <form className="h-full">
            <FormField
              control={form.control}
              name="searchValue"
              render={({ field }) => (
                <FormItem className="h-full">
                  <FormControl>
                    <Input
                      className="h-full rounded-r-lg border-none bg-slate-200 px-1 text-[10px] hover:bg-slate-300 focus:outline-none dark:bg-dark-100 dark:text-slate-100 dark:hover:bg-dark-100/70 sm:px-2 sm:text-[12px] md:text-[14px] lg:px-4"
                      placeholder={placeholder}
                      onKeyDown={(e: any) => {
                        setSearch(e.target.value);
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Search;
