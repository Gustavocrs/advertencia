import {useState} from "react";
import {MdHome} from "react-icons/md";
import {IoMdClose} from "react-icons/io";
import {MdOutlineSettings} from "react-icons/md";
import {CgMenuGridR} from "react-icons/cg";
import {useRouter} from "next/navigation";
import {
  VscNewFile,
  VscGitPullRequestGoToChanges,
  VscGoToSearch,
} from "react-icons/vsc";

export const SideBar = ({user}) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const toggleMenuOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const ItemsMenu = [
    {
      name: "Principal",
      icon: <MdHome />,
      route: "/principal",
    },
    {
      name: "Cadastros",
      icon: <VscGitPullRequestGoToChanges />,
      route: "/cadastro",
    },
    {
      name: "Consultas",
      icon: <VscGoToSearch />,
      route: "/consulta",
    },
    {
      name: "Advertências",
      icon: <VscNewFile />,
      route: "/cadastro/advertencia",
    },
  ];

  return (
    <div
      className={`bg-slate-400 flex flex-col fixed z-50 md:h-full self-start  ${
        isOpen ? "w-full h-full md:w-[160px] md:h-fit" : "h-14 md:w-14"
      }text-slate-800 select-none

    `}
    >
      {isOpen ? (
        <IoMdClose
          className="cursor-pointer mx-2 mt-2 text-4xl"
          onClick={toggleMenuOpen}
        />
      ) : (
        <CgMenuGridR
          className="cursor-pointer mx-2 mt-2 text-4xl"
          onClick={toggleMenuOpen}
        />
      )}

      <ul
        className={`flex-col cursor-pointer mt-8 gap-4 ml-3.5 py-5 ${
          isOpen ? "flex" : "hidden md:flex"
        }`}
      >
        {ItemsMenu.map((item, index) => (
          <li
            key={index}
            className="w-full flex items-center gap-4"
            onClick={() => {
              router.push(item.route);
              setIsOpen(false);
            }}
          >
            <div className="text-2xl">{item.icon}</div>
            <span
              className={`text-sm ml-1 ${
                !isOpen ? "w-[0] opacity-0" : "w-[100px] opacity-100 "
              }`}
            >
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
