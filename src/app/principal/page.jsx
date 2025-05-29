"use client";
import {NavBar} from "@/components/NavBar";
import {SideBar} from "@/components/SideBar";
import Advertencia from "@/pages/Advertencia";
import Cadastro from "@/pages/Cadastro";
import Consultas from "@/pages/Consulta";

export default function Principal() {
  return (
    <div className="flex flex-col items-center h-screen bg-zinc-200 w-full">
      {/* <Advertencia /> */}
      {/* <Cadastro /> */}
      {/* <Consultas /> */}
      <SideBar />
      <NavBar />
    </div>
  );
}
