import React from "react";
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";
import NavBar from "../../components/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col">
      <NavBar />
      <div className="flex h-full flex-col justify-between sm:flex-row">
        <LeftSidebar />
        <div className="w-[100%] bg-slate-50 p-8 dark:bg-dark-300 sm:w-[75%] lg:w-[64%]">
          {children}
        </div>
        <RightSidebar />
      </div>
    </main>
  );
}
