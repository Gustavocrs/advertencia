import {use, useEffect, useState} from "react";
import {MdHome} from "react-icons/md";
import {IoMdMenu, IoMdClose} from "react-icons/io";
import {MdAppRegistration} from "react-icons/md";
import {MdManageSearch} from "react-icons/md";
import {MdViewModule} from "react-icons/md";
import {CgNotes} from "react-icons/cg";
import {CgMenuGridR} from "react-icons/cg";
import {useRouter} from "next/navigation";

export const SideBar = () => {
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
      icon: <MdAppRegistration />,
      route: "/cadastro",
    },
    {
      name: "Consultas",
      icon: <MdManageSearch />,
      route: "/consulta",
    },
    {
      name: "Advertências",
      icon: <CgNotes />,
      route: "/advertencias",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`bg-slate-400 flex flex-col fixed z-50 md:h-full self-start  ${
        isOpen ? "w-[160px] h-fit" : " h-14 w-14"
      } transition-all duration-300 ease-in-out text-slate-800 select-none

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
            onClick={() => router.push(item.route)}
          >
            <div className="text-2xl">{item.icon}</div>
            <span
              className={`text-sm ml-1 transition-all duration-300 ${
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
