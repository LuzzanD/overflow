import React from "react";
import { navbarOptions } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MobileNavbar = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="flex flex-col gap-[4px] border-none px-2"
        >
          <div className="h-[1px] w-[15px] border-[1px] border-slate-600 dark:border-slate-200 md:w-[18px]"></div>
          <div className="h-[1px] w-[15px] border-[1px] border-slate-600 dark:border-slate-200 md:w-[18px]"></div>
          <div className="h-[1px] w-[15px] border-[1px] border-slate-600 dark:border-slate-200 md:w-[18px]"></div>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex w-[50%] flex-col border-none bg-slate-100 px-4 shadow-md dark:bg-dark-200 dark:shadow-dark-100 sm:w-[40%] md:w-[30%]"
      >
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="h-[50px] w-[110px]">
            <Link href="/">
              <div className="relative mt-[-15px] h-[50px] w-[120px] md:w-[140px]">
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
                  className="block object-contain dark:hidden"
                />
              </div>
            </Link>
          </SheetTitle>
          <SheetClose>
            <X className="mt-[-29px] h-5 w-5 dark:text-slate-200" />
          </SheetClose>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {navbarOptions.map((option) => {
            const isActive =
              pathname === option.href ||
              (option.href.slice(1) && pathname.includes(option.href.slice(1)));
            return (
              <Link href={option.href} key={option.value}>
                <div
                  className={`${
                    isActive ? "dark:secondary-gradient primary-gradient" : ""
                  } hover:primary-gradient group flex h-[50px] w-[80%] items-center justify-start gap-3 rounded-lg px-2 xl:px-4`}
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
                    } small-regular xl:body-regular group-hover:text-white dark:text-slate-100`}
                  >
                    {option.value}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        <SheetFooter className="mt-auto">
          <Button className="hover:primary-gradient hover:text-white">
            Logout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
