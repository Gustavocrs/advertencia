import {FaUserCircle} from "react-icons/fa";
import {IoMdNotifications} from "react-icons/io";
import {MdHelp} from "react-icons/md";
export const NavBar = () => {
  return (
    <div
      className={`w-full ml-13 h-14 bg-slate-400 fixed z-50
      flex items-center justify-between text-slate-800 
      font-semibold select-none
    `}
    >
      {/* <p className="text-sm ml-8 md:text-lg">
        Sistema de Gerenciamento de Alunos
      </p> */}
      <div className="w-full flex justify-end items-center gap-4 mr-20 text-2xl">
        <IoMdNotifications />
        <MdHelp />
        <FaUserCircle />
      </div>
    </div>
  );
};
