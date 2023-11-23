import React from "react";
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";
import NavBar from "../../components/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col">
      <NavBar />
      <div className="flex h-full justify-between">
        <LeftSidebar />
        <div className="w-[75%] bg-slate-50 dark:bg-dark-400 lg:w-[64%]">
          {children}
        </div>
        <RightSidebar />
      </div>
    </main>
  );
}
