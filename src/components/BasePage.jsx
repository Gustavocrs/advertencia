import {HeaderH1} from "@/components/HeaderH1";
import {NavBar} from "@/components/NavBar";
import {SideBar} from "@/components/SideBar";
import {useEffect, useState} from "react";

export default function BasePage({children, title}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    <div className="bg-zinc-200 text-slate-800 w-full min-h-screen h-full">
      <NavBar user={user} />
      <div className="flex flex-1">
        <SideBar user={user} />
        <div className="md:ml-14 mt-14 flex-1 flex flex-col">
          <HeaderH1 title={title} />
          <div className="flex flex-wrap justify-around items-center flex-1 text-lg mx-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
