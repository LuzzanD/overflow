"use client";

import React from "react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  // MenubarSeparator,
  // MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { themeOptions } from "@/constants";
import Image from "next/image";
import { useTheme } from "@/ThemeProvider";

const ThemeChanger = () => {
  const { mode, themeChanger } = useTheme();
  return (
    <div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer bg-transparent focus:outline-none">
            <Image
              src={`/assets/icons/${
                mode === "light" ? "sun" : mode === "dark" ? "moon" : "computer"
              }.svg`}
              alt="theme icon"
              width={20}
              height={20}
            />
          </MenubarTrigger>
          <MenubarContent className="flex flex-col items-center gap-2 bg-slate-200 px-2 ">
            {themeOptions.map((option) => {
              return (
                <MenubarItem
                  key={option.name}
                  // value={option.name}
                  onClick={() => {
                    // console.log("light");
                    themeChanger(option.name);
                  }}
                  className="cursor-pointer bg-transparent"
                >
                  {
                    <Image
                      src={option.icon}
                      alt="theme icon"
                      width={20}
                      height={20}
                      className="hover:invert-[100%]"
                    />
                  }
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
