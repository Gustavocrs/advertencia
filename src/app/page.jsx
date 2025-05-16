"use client";
import {useRouter} from "next/navigation";
import Cadastro from "@/pages/Cadastro";
import Advertencia from "@/pages/Advertencia";
import Consultas from "@/pages/Consulta";
import {Login} from "@/pages/Login";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center h-screen bg-zinc-200 w-full">
      <Login router={router} />
      {/* <Advertencia router={router} />
      <Cadastro router={router} />
      <Consultas router={router} /> */}
    </div>
  );
}
