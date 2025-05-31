import {HeaderH1} from "@/components/HeaderH1";
import {NavBar} from "@/components/NavBar";
import {SideBar} from "@/components/SideBar";
import {useEffect, useState} from "react";

export default function BasePage({children, title}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className="flex flex-col h-screen bg-zinc-200 text-slate-800 w-full">
      <SideBar user={user} />
      <NavBar user={user} />
      <div className="ml-14 mt-14">
        <HeaderH1 title={title} />
        <div className="flex flex-col h-[90%] ml-4 text-lg">{children}</div>
      </div>
    </div>
  );
}
