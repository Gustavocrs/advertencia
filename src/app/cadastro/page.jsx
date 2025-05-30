"use client";
import {NavBar} from "@/components/NavBar";
import {SideBar} from "@/components/SideBar";
import {FaUserCircle} from "react-icons/fa";
import {useRouter} from "next/navigation";
import {Card} from "@/components/Card";
import {useEffect} from "react";
import {HeaderH1} from "@/components/HeaderH1";

export default function cadastro() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);
  return (
    <div className="flex flex-col h-screen bg-zinc-200 w-full">
      <SideBar />
      <NavBar />
      <div className="md:ml-16 mt-14 ">
        <div className="flex flex-col items-center justify-center h-full">
          <HeaderH1 title="Cadastros" />
          <div className={`w-full h-fit py-4 p-2 md:pl-2 flex flex-wrap gap-4`}>
            <Card
              title={"Novo Usuário"}
              icon={<FaUserCircle />}
              onClick={() => router.push("cadastro/usuario")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
