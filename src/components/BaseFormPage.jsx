"use client";
import {NavBar} from "@/components/NavBar";
import {FaUserCircle} from "react-icons/fa";
import {SideBar} from "@/components/SideBar";

const BaseFormPage = ({children, title}) => {
  return (
    <div className="flex flex-col h-fit bg-zinc-200 w-full">
      <SideBar />
      <NavBar />
      <div className="md:ml-16 mt-14">
        <div className="flex justify-start items-center ml-2">
          <FaUserCircle className="text-4xl" />
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
