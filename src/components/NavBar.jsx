import {VscAccount, VscGear} from "react-icons/vsc";
import {IoMdNotifications} from "react-icons/io";
import {MdHelp} from "react-icons/md";
import Profile from "./Profile";

export const NavBar = ({user}) => {
  return (
    <div
      className={`w-full ml-13 h-14 bg-slate-400 fixed z-50
      flex items-center justify-between text-slate-800 
      font-semibold select-none
    `}
    >
      {user && (
        <div className="md:flex w-full gap-10 items-center justify-start hidden ml-10">
          <div className="flex justify-around items-center gap-2">
            <span className="text-slate-900 font-bold">Usuário: </span>
            <span>{user.nome}</span>
          </div>
        </div>
      )}
      <div className="w-full flex justify-end items-center gap-4 mr-20 text-2xl">
        <Profile />
      </div>
    </div>
  );
};
