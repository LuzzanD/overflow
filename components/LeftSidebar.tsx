/* eslint-disable tailwindcss/no-custom-classname */
import React from "react";
import { navbarOptions } from "../constants";
import Link from "next/link";
import Image from "next/image";

const LeftSidebar = () => {
  return (
    <section className="background-light800_dark400 flex h-full w-[25%] flex-col gap-2 px-2">
      {navbarOptions.map((option) => {
        return (
          <Link href={option.href} key={option.value}>
            <div className="hover:primary-gradient mx-auto flex h-[50px] w-[80%] items-center justify-start gap-4 rounded-lg p-2">
              <Image
                src={option.icon}
                alt="icon"
                width={20}
                height={20}
                className="bg-slate-900"
              />
              <p className="body-regular">{option.value}</p>
            </div>
          </Link>
        );
      })}
    </section>
  );
};

export default LeftSidebar;
