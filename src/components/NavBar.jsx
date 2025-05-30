import {FaUserCircle} from "react-icons/fa";
import {IoMdNotifications} from "react-icons/io";
import {MdHelp} from "react-icons/md";

import {useRouter} from "next/navigation";
export const NavBar = () => {
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
      {/* <p>{user.nome}</p> */}
      <div className="w-full flex justify-end items-center gap-4 mr-20 text-2xl">
        <IoMdNotifications />
        <MdHelp />
        <FaUserCircle onClick={handleLogout} />
      </div>
    </div>
  );
};
