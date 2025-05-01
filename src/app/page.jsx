"use client";
import {useRouter} from "next/navigation";
import {Cadastro} from "@/page_components/Cadastro";
import {Advertencia} from "@/page_components/Advertencia";
import {Consultas} from "@/page_components/Consulta";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center h-screen bg-zinc-200 w-full">
      <Advertencia router={router} />
      <Cadastro router={router} />
      <Consultas router={router} />
    </div>
  );
}
