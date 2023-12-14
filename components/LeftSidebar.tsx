"use client";

/* eslint-disable tailwindcss/no-custom-classname */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { navbarOptions } from "../constants";
import { usePathname } from "next/navigation";

const LeftSidebar = () => {
  const pathname = usePathname();

  return (
    <section className="z-[8] hidden min-h-screen flex-col gap-1 bg-slate-50 py-8 shadow-xl dark:bg-dark-200 dark:shadow-dark-100 lg:flex lg:w-[16%] xl:gap-2 xl:px-0 2xl:px-1">
      {navbarOptions.map((option) => {
        const isActive =
          pathname === option.href ||
          (option.href.slice(1) && pathname.includes(option.href.slice(1)));
        return (
          <Link href={option.href} key={option.value}>
            <div
              className={`${
                isActive ? "dark:secondary-gradient primary-gradient" : ""
              } hover:primary-gradient dark:hover:secondary-gradient group mx-auto flex h-[45px] w-[85%] items-center justify-start gap-3 rounded-lg px-2 xl:h-[50px] xl:px-4`}
            >
              <Image
                src={option.icon}
                alt="icon"
                width={17}
                height={17}
                className={`${
                  isActive ? "invert-0" : ""
                } invert-colors group-hover:invert-0`}
              />
              <p
                className={`${
                  isActive ? "text-white" : ""
                } text-[12px] group-hover:text-white dark:text-slate-100 xl:text-[14px]`}
              >
                {option.value}
              </p>
            </div>
          </Link>
        );
      })}
    </section>
  );
};

export default LeftSidebar;
