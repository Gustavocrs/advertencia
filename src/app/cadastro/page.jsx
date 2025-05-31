"use client";
import {NavBar} from "@/components/NavBar";
import {SideBar} from "@/components/SideBar";
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
          title={"Novo Usuário"}
          icon={<FaUserCircle />}
          onClick={() => router.push("cadastro/usuario")}
        />
        <Card
          title={"Novo Aluno"}
          icon={<FaUserCircle />}
          onClick={() => router.push("cadastro/aluno")}
        />
      </div>
    </BasePage>
  );
}
