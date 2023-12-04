"use client";

import React from "react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { themeOptions } from "@/constants";
import Image from "next/image";
import { useTheme } from "@/context/ThemeProvider";

const ThemeChanger = () => {
  const { mode, themeChanger } = useTheme();
  return (
    <div>
      <Menubar className="border-none">
        <MenubarMenu>
          <MenubarTrigger className="mt-1 cursor-pointer rounded-md bg-none p-0 outline-none focus:outline-none">
            <div className="relative aspect-square w-[18px] lg:w-[20px]">
              <Image
                src={`/assets/icons/${
                  mode === "light"
                    ? "sun"
                    : mode === "dark"
                    ? "moon"
                    : "computer"
                }.svg`}
                alt="theme icon"
                fill={true}
                className="object-contain"
              />
            </div>
          </MenubarTrigger>
          <MenubarContent className="ml-[-40px] flex flex-col items-center gap-2 bg-slate-200 px-2">
            {themeOptions.map((option) => {
              return (
                <MenubarItem
                  key={option.name}
                  // value={option.name}
                  onClick={() => {
                    // console.log("light");
                    themeChanger(option.name);
                  }}
                  className="flex w-[100px] cursor-pointer items-center justify-start gap-4 bg-transparent"
                >
                  <Image
                    src={option.icon}
                    alt="theme icon"
                    width={20}
                    height={20}
                    className="hover:invert-[100%]"
                  />
                  <span className="block text-[#7B8EC8]">{option.name}</span>
                </MenubarItem>
              );
            })}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default ThemeChanger;
