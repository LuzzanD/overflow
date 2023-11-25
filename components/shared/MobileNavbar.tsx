import React from "react";
import { navbarOptions } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="flex flex-col gap-[4px] border-none px-2"
          >
            <div className="h-[1px] w-[20px] border-[1px] border-slate-600"></div>
            <div className="h-[1px] w-[20px] border-[1px] border-slate-600"></div>
            <div className="h-[1px] w-[20px] border-[1px] border-slate-600"></div>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex w-[50%] flex-col bg-slate-100 px-4 sm:w-[40%] md:w-[30%]"
        >
          <SheetHeader className="flex flex-row justify-between space-y-0">
            <SheetTitle className="relative h-[30px] w-[110px]">
              <Image
                src="/assets/images/logo-light.svg"
                alt="overflow logo"
                fill={true}
                className="object-contain"
              />
            </SheetTitle>
            <SheetClose>
              <X className="h-5 w-5" />
            </SheetClose>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            {navbarOptions.map((option) => {
              return (
                <Link href={option.href} key={option.value}>
                  <div className="hover:primary-gradient group flex h-[50px] w-[80%] items-center justify-start gap-3 rounded-lg px-2 xl:px-4">
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
          </div>
          <SheetFooter className="mt-auto">
            <Button className="hover:primary-gradient hover:text-white">
              Logout
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
