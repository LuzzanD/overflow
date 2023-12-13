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
    <nav className="z-10 flex h-[60px] w-full items-center justify-between bg-slate-50 p-4 shadow-md dark:bg-dark-300 dark:shadow-dark-100 md:p-6 lg:p-10">
      <Link href="/">
        <div className="relative block aspect-square w-[26px] xs:w-[30px] sm:hidden">
          <Image
            src="/assets/images/site-logo.svg"
            alt="overflow logo"
            fill={true}
            className="object-contain"
          />
        </div>
        <div className="relative hidden sm:block sm:h-[50px] sm:w-[140px] md:w-[160px] lg:w-[180px] xl:w-[200px]">
          <Image
            src="/assets/images/logo-dark.svg"
            alt="overflow logo"
            fill={true}
            className="hidden object-contain dark:block"
          />
          <Image
            src="/assets/images/logo-light.svg"
            alt="overflow logo"
            fill={true}
            className="object-contain dark:hidden"
          />
        </div>
      </Link>
      <div className="w-[50%]">
        <GlobalSearch />
      </div>
      <div className="flex items-center gap-1 md:gap-2 lg:gap-[10px]">
        <ThemeChanger />
        <SignedOut>
          <Link
            href="/sign-in"
            className="btn primary-gradient rounded-md px-2.5 py-1.5 text-[10px] text-light-900 sm:text-[12px] md:text-[13px] lg:px-4 lg:py-2 lg:text-[15px]"
          >
            Sign In
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  "w-[28px] h-[28px] md:h-[30px] lg:w-[35px] md:w-[30px] lg:h-[35px]",
              },
            }}
          />
        </SignedIn>
        <div className="lg:hidden">
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
