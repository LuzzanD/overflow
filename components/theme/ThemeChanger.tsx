"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { themeOptions } from "@/constants";
import Image from "next/image";
import { useTheme } from "@/ThemeProvider";

const ThemeChanger = () => {
  const { mode, setMode } = useTheme();
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[70px]">
          <Image
            src={`/assets/icons/${
              mode === "light" ? "sun" : mode === "dark" ? "moon" : "computer"
            }.svg`}
            alt="theme icon"
            width={20}
            height={20}
          />
        </SelectTrigger>
        <SelectContent>
          {themeOptions.map((option) => {
            return (
              <SelectItem
                key={option.name}
                value={option.name}
                onSelect={() => {
                  setMode(`${option.name}`);
                  console.log(option.name);
                }}
              >
                {
                  <Image
                    src={option.icon}
                    alt="theme icon"
                    width={20}
                    height={20}
                  />
                }
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ThemeChanger;
