"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

const Pagination = ({ isNext }: { isNext: boolean }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const url = formUrlQuery({
      searchParams: searchParams.toString(),
      key: "page",
      value: page.toString(),
    });
    router.push(url, { scroll: false });
  }, [page]);

  return (
    <div className="flex justify-center gap-2">
      <button
        onClick={() => {
          setPage((prevValue) => prevValue - 1);
        }}
        disabled={page === 1}
        className={`rounded-md bg-slate-200 px-4 py-2 text-[12px] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-dark-100 dark:text-slate-100`}
      >
        Prev
      </button>
      <div className="primary-gradient dark:secondary-gradient flex w-[35px] items-center justify-center rounded-md text-[12px] text-white">
        {page >= 0 ? page : 0}
      </div>
      <button
        onClick={() => {
          setPage((prevValue) => prevValue + 1);
        }}
        className="rounded-md bg-slate-200 px-4 py-2 text-[12px] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-dark-100 dark:text-slate-100"
        disabled={!isNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
