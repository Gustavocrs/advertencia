"use client";
import {NavBar} from "@/components/NavBar";
import {SideBar} from "@/components/SideBar";
import {FaUserCircle} from "react-icons/fa";
import {useRouter} from "next/navigation";
import {Card} from "@/components/Card";
import {HeaderH1} from "@/components/HeaderH1";

export default function consulta() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen bg-zinc-200 w-full">
      <SideBar />
      <NavBar />
      <div className="md:ml-16 mt-14">
        <div className="flex flex-col items-center justify-center h-full">
          <HeaderH1 title="Consultas" />
          <div className={`w-full h-fit py-4 p-2 md:pl-2 flex flex-wrap gap-4`}>
            <Card
              title={"Usuários"}
              icon={<FaUserCircle />}
              onClick={() => router.push("consulta/usuarios")}
            />
            <Card
              title={"Advertências"}
              icon={<FaUserCircle />}
              onClick={() => router.push("consulta/advertencia")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
