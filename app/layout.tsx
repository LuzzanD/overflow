import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import NavBar from "../components/NavBar";
// import Footer from "../components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <ClerkProvider>
          <body className={`${inter.className} flex flex-col`}>
            <NavBar />

            <div className="flex h-full justify-between">
              <LeftSidebar />
              {children}
              <RightSidebar />
            </div>
          </body>
        </ClerkProvider>
      </ThemeProvider>
    </html>
  );
}
