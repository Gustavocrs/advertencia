"use client";
import {FaUserCircle} from "react-icons/fa";
import {useRouter} from "next/navigation";
import {Card} from "@/components/Card";
import {useEffect} from "react";
import BasePage from "@/components/BasePage";
import withAuth from "@/components/withAuth";

const cadastro = () => {
  const router = useRouter();

  return (
    <BasePage title="Cadastros">
      <div
        className={`w-full h-full py-4 p-2 md:pl-2 flex flex-wrap gap-4 h-min-screen`}
      >
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
};

export default withAuth(cadastro);
