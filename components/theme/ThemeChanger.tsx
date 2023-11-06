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
  const { mode } = useTheme();
  return (
    <div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="w-[60px] bg-slate-200 focus:outline-none">
            <Image
              src={`/assets/icons/${
                mode === "light" ? "sun" : mode === "dark" ? "moon" : "computer"
              }.svg`}
              alt="theme icon"
              width={20}
              height={20}
            />
          </MenubarTrigger>
          <MenubarContent className="bg-slate-200">
            {themeOptions.map((option) => {
              return (
                <MenubarItem
                  key={option.name}
                  // value={option.name}
                  onClick={() => {
                    console.log("light");
                    // themeChanger(option.name);
                  }}
                  className="w-[60px]"
                >
                  {
                    <Image
                      src={option.icon}
                      alt="theme icon"
                      width={20}
                      height={20}
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
