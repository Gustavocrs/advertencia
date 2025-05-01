"use client";
import {HeaderH1} from "@/components/HeaderH1";
import {useRouter} from "next/navigation";

export default function Servidor() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-start h-screen bg-zinc-200">
      <HeaderH1 onClick={() => router.back()} title="Consulta de Servidores" />
    </div>
  );
}
