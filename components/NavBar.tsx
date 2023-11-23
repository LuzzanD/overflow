"use client";

import React from "react";
import Image from "next/image";
import MobileNavbar from "./shared/MobileNavbar";

// import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, useUser, UserButton } from "@clerk/nextjs";

import ThemeChanger from "./theme/ThemeChanger";
import GlobalSearch from "./shared/GlobalSearch";

const NavBar = () => {
  const { user } = useUser();

  console.log(user);

  return (
    <nav className="z-10 flex h-[60px] w-full items-center justify-around bg-slate-50 p-4 shadow-md dark:bg-dark-300 dark:shadow-dark-100 md:justify-between md:p-6 lg:p-10">
      <Link href="/">
        <div className="relative block aspect-square w-[30px] sm:hidden">
          <Image
            src="/assets/images/site-logo.svg"
            alt="overflow logo"
            fill={true}
            // height={50}
            // width={200}
            className="object-contain"
          />
        </div>
        <div className="relative hidden sm:block sm:h-[50px] sm:w-[140px] md:w-[160px] lg:w-[180px] xl:w-[200px]">
          <Image
            src="/assets/images/logo-dark.svg"
            alt="overflow logo"
            fill={true}
            // height={50}
            // width={200}
            className="hidden object-contain dark:block"
          />
          <Image
            src="/assets/images/logo-light.svg"
            alt="overflow logo"
            fill={true}
            // height={50}
            // width={200}
            className="object-contain dark:hidden"
          />
        </div>
      </Link>
      <GlobalSearch />
      <div className="flex items-center gap-1 md:gap-2 lg:gap-[10px]">
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
        <div className="ml-1 sm:hidden">
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
