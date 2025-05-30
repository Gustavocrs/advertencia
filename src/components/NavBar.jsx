import {FaUserCircle} from "react-icons/fa";
import {IoMdNotifications} from "react-icons/io";
import {MdHelp} from "react-icons/md";

import {useRouter} from "next/navigation";
export const NavBar = ({user}) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };
  return (
    <div
      className={`w-full ml-13 h-14 bg-slate-400 fixed z-50
      flex items-center justify-between text-slate-800 
      font-semibold select-none
    `}
    >
      {user && (
        <div className="md:flex w-full gap-10 items-center justify-center hidden">
          <div className="flex flex-col justify-center items-center">
            <span className="text-slate-900 font-bold">Usuário</span>
            <span>{user.nome}</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-slate-900 font-bold">E-mail</span>
            <span>{user.email}</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-slate-900 font-bold">Matrícula</span>
            <span>{user.matricula}</span>
          </div>
        </div>
      )}
      <div className="w-full md:w-0 flex justify-end items-center gap-4 mr-20 text-2xl">
        <IoMdNotifications />
        <MdHelp />
        <FaUserCircle onClick={handleLogout} />
      </div>
    </div>
  );
};
