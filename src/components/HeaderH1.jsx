import {IoMdArrowRoundBack} from "react-icons/io";

export const HeaderH1 = ({onClick, title, OrBG = "bg-zinc-200", OrH1 = ""}) => {
  return (
    <header
      className={`flex items-center justify-center w-full h-16 text-slate-800 p-4 shadow-lg mb-4 hover:cursor-pointer transition duration-300 ease-in-out text-2xl ${OrBG}`}
    >
      <h1
        className={`text-center text-3xl font-semibold w-full text-slate-800 p-2 ${OrH1}`}
      >
        {title}
      </h1>
    </header>
  );
};
