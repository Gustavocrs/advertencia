"use client";
import {useRouter} from "next/navigation";
import {Button} from "@/components/Button";
import {Cadastro} from "@/components/Cadastro";
import {Advertencia} from "@/components/Advertencia";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center h-screen bg-zinc-200 w-full">
      <Advertencia router={router} />
      <Cadastro router={router} />
    </div>
  );
}
