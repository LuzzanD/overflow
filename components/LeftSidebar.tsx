/* eslint-disable tailwindcss/no-custom-classname */
import React from "react";
import { navbarOptions } from "../constants";
import Link from "next/link";
import Image from "next/image";

const LeftSidebar = () => {
  return (
    <section className="background-light800_dark400 flex min-h-screen w-[18%] flex-col gap-2 px-2 py-4">
      {navbarOptions.map((option) => {
        return (
          <Link href={option.href} key={option.value}>
            <div className="hover:primary-gradient group mx-auto flex h-[50px] w-[80%] items-center justify-start gap-3 rounded-lg px-4">
              <Image
                src={option.icon}
                alt="icon"
                width={20}
                height={20}
                className="invert-colors group-hover:invert-0"
              />
              <p className="body-regular group-hover:text-white">
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
