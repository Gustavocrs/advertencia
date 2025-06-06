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
    <div className="flex flex-col md:h-screen bg-zinc-200 text-slate-800 w-full h-screen">
      <SideBar user={user} />
      <NavBar user={user} />
      <div className="md:ml-14 mt-14">
        <HeaderH1 title={title} />
        <div className="flex flex-wrap justify-around items-center h-[90%] text-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
