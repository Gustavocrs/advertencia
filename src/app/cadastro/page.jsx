"use client";
import {FaUserCircle} from "react-icons/fa";
import {useRouter} from "next/navigation";
import {Card} from "@/components/Card";
import {useEffect} from "react";
import BasePage from "@/components/BasePage";

export default function cadastro() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);
  return (
    <BasePage title="Cadastros">
      <div className={`w-full h-fit py-4 p-2 md:pl-2 flex flex-wrap gap-4`}>
        <Card
          title={"Novo Aluno"}
          icon={<FaUserCircle />}
          onClick={() => router.push("cadastro/aluno")}
        />

        <Card
          title={"Nova Turma"}
          icon={<FaUserCircle />}
          onClick={() => router.push("cadastro/turmas")}
        />
      </div>
    </BasePage>
  );
}
