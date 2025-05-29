import {useState} from "react";
import {MdHome} from "react-icons/md";
import {IoMdMenu, IoMdClose} from "react-icons/io";
import {MdAppRegistration} from "react-icons/md";
import {MdManageSearch} from "react-icons/md";
import {MdViewModule} from "react-icons/md";
import {CgNotes} from "react-icons/cg";
import {CgMenuGridR} from "react-icons/cg";
export const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenuOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const ItemsMenu = [
    {
      name: "Principal",
      icon: <MdHome />,
    },
    {
      name: "Cadastros",
      icon: <MdAppRegistration />,
    },
    {
      name: "Consultas",
      icon: <MdManageSearch />,
    },
    {
      name: "Advertências",
      icon: <CgNotes />,
    },
  ];

  return (
    <div
      className={`bg-slate-400 flex flex-col fixed z-50 h-full self-start ${
        isOpen ? "w-[160px]" : "w-[52px]"
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
      <ul className="flex flex-col cursor-pointer mt-8 gap-4 ml-3.5">
        {ItemsMenu.map((item, index) => (
          <li
            key={index}
            className="w-full flex items-center gap-4"
            onClick={() => console.log(`Navigating to ${item.name}`)}
          >
            <div className="text-2xl">{item.icon}</div>
            <span
              className={`text-sm ml-1 transition-all duration-300 ${
                !isOpen ? "opacity-0 w-0" : "opacity-100 w-[100px]"
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
