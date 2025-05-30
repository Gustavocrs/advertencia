"use client";
import {NavBar} from "@/components/NavBar";
import {SideBar} from "@/components/SideBar";
import {useEffect, useState} from "react";

export default function Principal() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className="flex flex-col h-screen bg-zinc-200 w-full">
      <SideBar />
      <NavBar />
      <div className="ml-16 mt-14">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-lg">
            {user && user ? `Bem vindo, ${user.nome}!` : ""}
          </h1>
        </div>
      </div>
    </div>
  );
}
