import {FaUserCircle} from "react-icons/fa";
import {IoMdNotifications} from "react-icons/io";
import {MdHelp} from "react-icons/md";
export const NavBar = () => {
  return (
    <div
      className={`w-full ml-26 h-12 bg-slate-400 fixed z-50
      flex items-center justify-between text-slate-800 text-xl
      font-semibold select-none
    `}
    >
      <p className="ml-8">Sistema de Gerenciamento de Alunos</p>
      <div className="flex items-center gap-4 mr-20 text-2xl">
        <IoMdNotifications />
        <MdHelp />
        <FaUserCircle />
      </div>
    </div>
  );
};
