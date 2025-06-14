"use client";
import {NavBar} from "@/components/NavBar";
import {FaUserCircle} from "react-icons/fa";
import {SideBar} from "@/components/SideBar";
import {useEffect, useState} from "react";
import {IoMdArrowRoundBack} from "react-icons/io";
import {useRouter} from "next/navigation";

const BaseFormPage = ({children, title, icon}) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  return (
    <div className="flex flex-col h-full min-h-screen bg-zinc-200 w-full h-min-screen">
      {/* <SideBar user={user} /> */}
      <NavBar user={user} />
      <div className="md:ml-16 mt-14">
        <div className="flex justify-start gap-5 items-center ml-2">
          <IoMdArrowRoundBack
            className="text-2xl cursor-pointer"
            onClick={() => router.back()}
          />
          {icon ? icon : <FaUserCircle className="text-4xl" />}
          <h1 className="text-3xl p-4 font-bold uppercase text-slate-800 ">
            {title}
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseFormPage;
