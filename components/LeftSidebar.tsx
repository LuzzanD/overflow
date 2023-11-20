/* eslint-disable tailwindcss/no-custom-classname */
import React from "react";
import { navbarOptions } from "../constants";
import Link from "next/link";
import Image from "next/image";

const LeftSidebar = () => {
  return (
    <section className="z-[8] hidden min-h-screen flex-col gap-1 bg-slate-50 py-8 shadow-xl dark:bg-slate-800 lg:flex lg:w-[16%] xl:gap-2 xl:px-1 2xl:px-2">
      {navbarOptions.map((option) => {
        return (
          <Link href={option.href} key={option.value}>
            <div className="hover:primary-gradient group mx-auto flex h-[50px] w-[80%] items-center justify-start gap-3 rounded-lg px-2 xl:px-4">
              <Image
                src={option.icon}
                alt="icon"
                width={17}
                height={17}
                className="invert-colors group-hover:invert-0"
              />
              <p className="small-regular xl:body-regular group-hover:text-white">
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
