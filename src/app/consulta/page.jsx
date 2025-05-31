"use client";
import {NavBar} from "@/components/NavBar";
import {SideBar} from "@/components/SideBar";
import {FaUserCircle} from "react-icons/fa";
import {useRouter} from "next/navigation";
import {Card} from "@/components/Card";
import {HeaderH1} from "@/components/HeaderH1";
import BasePage from "@/components/BasePage";

export default function consulta() {
  const router = useRouter();

  return (
    <BasePage title={"Consultas"}>
      <div className={`w-full h-fit py-4 p-2 md:pl-2 flex flex-wrap gap-4`}>
        <Card
          title={"Usuários"}
          icon={<FaUserCircle />}
          onClick={() => router.push("consulta/usuarios")}
        />
        <Card
          title={"Alunos"}
          icon={<FaUserCircle />}
          onClick={() => router.push("consulta/aluno")}
        />
        <Card
          title={"Advertências"}
          icon={<FaUserCircle />}
          onClick={() => router.push("consulta/advertencia")}
        />
      </div>
    </BasePage>
  );
}
