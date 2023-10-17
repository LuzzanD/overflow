"use client";

import React from "react";
import Image from "next/image";

// import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";

import ThemeChanger from "./theme/ThemeChanger";
import GlobalSearch from "./shared/GlobalSearch";

const NavBar = () => {
  const { user } = useUser();

  console.log(user);

  return (
    <nav className="background-light850_dark100 flex-between h-[60px] w-full p-10">
      <div>
        <Link href="/">
          <Image
            src="/assets/images/logo.png"
            alt="overflow logo"
            height={50}
            width={200}
            className="rounded-full"
          />
        </Link>
      </div>
      <GlobalSearch />
      <div className="flex gap-4">
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
          <Image
            src={user ? user.imageUrl : ""}
            alt="account profile picture"
            height={40}
            width={40}
            className="rounded-full"
          />
        </SignedIn>
      </div>
    </nav>
  );
};

export default NavBar;
