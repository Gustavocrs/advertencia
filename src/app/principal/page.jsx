"use client";
import {NavBar} from "@/components/NavBar";
import {SideBar} from "@/components/SideBar";

export default function Principal() {
  return (
    <div className="flex flex-col h-screen bg-zinc-200 w-full">
      <SideBar />
      <NavBar />
      <div className="ml-16 mt-14">
        <div className="flex flex-col items-center justify-center h-full">
          Página Principal
        </div>
      </div>
    </div>
  );
}
