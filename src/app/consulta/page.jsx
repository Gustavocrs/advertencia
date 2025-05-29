"use client";
import {NavBar} from "@/components/NavBar";
import {SideBar} from "@/components/SideBar";
import Consultas from "@/pages/Consulta";

export default function consulta() {
  return (
    <div className="flex flex-col h-screen bg-zinc-200 w-full">
      <SideBar />
      <NavBar />
      <div className="ml-16 mt-14">
        <div className="flex flex-col items-center justify-center h-full">
          <Consultas />
        </div>
      </div>
    </div>
  );
}
