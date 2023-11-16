"use client";

import React from "react";
import Image from "next/image";

// import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, useUser, UserButton } from "@clerk/nextjs";

import ThemeChanger from "./theme/ThemeChanger";
import GlobalSearch from "./shared/GlobalSearch";

const NavBar = () => {
  const { user } = useUser();

  console.log(user);

  return (
    <nav className="z-10 flex h-[60px] w-full items-center justify-between bg-slate-50 p-10 shadow-md dark:bg-slate-800">
      <div>
        <Link href="/">
          <Image
            src="/assets/images/logo.png"
            alt="overflow logo"
            height={50}
            width={200}
            className="rounded-full hover:scale-[102%]"
          />
        </Link>
      </div>
      <GlobalSearch />
      <div className="flex items-center gap-4">
        <ThemeChanger />
        <SignedOut>
          <Link
            href="/sign-in"
            className="btn primary-gradient rounded-md px-4 py-2 text-light-900"
          >
            Sign In
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default NavBar;
