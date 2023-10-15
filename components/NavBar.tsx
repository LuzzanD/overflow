"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";

import ThemeChanger from "./theme/ThemeChanger";

const NavBar = () => {
  return (
    <nav className="background-light850_dark100 flex-between h-[60px] w-full p-10">
      <div>
        <Image
          src="/assets/images/logo.png"
          alt="overflow logo"
          height={50}
          width={200}
          className="rounded-full"
        />
      </div>
      <div className="background-light700_dark300 flex w-[600px] rounded-lg">
        <div className="flex-center relative w-[50px]">
          <Image
            src="/assets/icons/search.svg"
            alt="search-icon"
            width={25}
            height={25}
          />
        </div>
        <Input className="rounded-none border-none bg-transparent outline-none" />
      </div>
      <div className="flex gap-2">
        <ThemeChanger />
        <Link
          href="/sign-in"
          className="btn primary-gradient rounded-md px-4 py-2 text-light-900"
        >
          Sign In
        </Link>
        <SignedIn>
          <Image
            src="/assets/vercel.svg"
            alt="account profile picture"
            height={30}
            width={30}
            className="rounded-full"
          />
        </SignedIn>
      </div>
    </nav>
  );
};

export default NavBar;
