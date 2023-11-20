import "./globals.css";
import "../styles/theme.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import NavBar from "../components/NavBar";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/context/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Devflow",
  description: "Stack Overflow copy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <ThemeProvider>
          <body className={`${inter.className} flex flex-col`}>
            <NavBar />

            <div className="flex h-full justify-between">
              <LeftSidebar />
              <div className="w-[75%] bg-slate-50 dark:bg-slate-800 lg:w-[64%]">
                {children}
              </div>
              <RightSidebar />
            </div>
          </body>
        </ThemeProvider>
      </ClerkProvider>
    </html>
  );
}
