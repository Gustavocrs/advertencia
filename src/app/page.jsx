"use client";
import {useRouter} from "next/navigation";
import {Button} from "@/components/Button";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-zinc-200">
      <div className="w-full">
        <h1 className={h1Style}>Advertências</h1>
        <div className={DivAreaStyle}>
          <Button>Criar</Button>
          <Button>Consultar</Button>
        </div>
      </div>

      <div className="w-full">
        <h1 className={h1Style}>Cadastro</h1>
        <div className={DivAreaStyle}>
          <Button onClick={() => router.push("cadastro/incluiraluno")}>
            Incluir Aluno
          </Button>
          <Button onClick={() => router.push("cadastro/incluirresponsavel")}>
            Incluir Responsável
          </Button>
          <Button onClick={() => router.push("cadastro/incluirservidor")}>
            Incluir Servidor
          </Button>
        </div>
      </div>
    </div>
  );
}

const h1Style = "text-2xl font-semibold text-center bg-sky-900 text-white p-2";

const DivAreaStyle = "flex wrap justify-center items-center";
