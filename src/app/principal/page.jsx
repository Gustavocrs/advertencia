"use client";
import {useRouter} from "next/navigation";
import {Login} from "@/pages/Login";
import Advertencia from "@/pages/Advertencia";
import Cadastro from "@/pages/Cadastro";
import Consultas from "@/pages/Consulta";

export default function Principal() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center h-screen bg-zinc-200 w-full">
      <Advertencia router={router} />
      <Cadastro router={router} />
      <Consultas router={router} />
    </div>
  );
}
