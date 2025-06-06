import {useState} from "react";
import {MdHome} from "react-icons/md";
import {IoMdClose} from "react-icons/io";
import {IoSearchSharp} from "react-icons/io5";
import {CgMenuGridR} from "react-icons/cg";
import {useRouter} from "next/navigation";
import {IoPersonAdd} from "react-icons/io5";

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
      icon: <IoPersonAdd />,
      route: "/cadastro",
    },
    {
      name: "Consultas",
      icon: <IoSearchSharp />,
      route: "/consulta",
    },
    // {
    //   name: "Advertências",
    //   icon: <BsFileEarmarkBarGraphFill />,
    //   route: "/cadastro/advertencia",
    // },
  ];

  return (
    <div
      className={`bg-slate-400 flex flex-col fixed z-50 md:h-full self-start ${
        isOpen ? "w-full h-full md:w-[160px] md:h-fit" : "h-14 md:w-14"
      }text-slate-800 select-none

    `}
    >
      {isOpen ? (
        <IoMdClose
          className="cursor-pointer mx-3 mt-2 text-4xl"
          onClick={toggleMenuOpen}
        />
      ) : (
        <CgMenuGridR
          className="cursor-pointer mx-3 mt-2 text-4xl"
          onClick={toggleMenuOpen}
        />
      )}

      <ul
        className={`h-[50%] md:flex-col flex-wrap cursor-pointer mt-3 gap-7 ml-4 py-5 items-center justify-around md:justify-start ${
          isOpen ? "flex" : "hidden md:flex"
        }`}
      >
        {ItemsMenu.map((item, index) => (
          <li
            key={index}
            className="flex-col md:w-full flex items-center gap-4 md:flex-row"
            onClick={() => {
              router.push(item.route);
              setIsOpen(false);
            }}
          >
            <div className="text-6xl md:text-2xl hover:scale-150 transform transition-all ease-in-out">
              {item.icon}
            </div>
            <span
              className={`text-center text-sm md:text-left ${
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
