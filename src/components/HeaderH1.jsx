import {IoMdArrowRoundBack} from "react-icons/io";

export const HeaderH1 = ({onClick, title, OrBG = "bg-sky-900", OrH1 = ""}) => {
  return (
    <>
      <header
        className={`flex items-center justify-center w-full h-16 text-white p-4 shadow-lg mb-4 hover:cursor-pointer transition duration-300 ease-in-out text-2xl ${OrBG}`}
      >
        <IoMdArrowRoundBack className="mr-2" onClick={onClick} />
        <h1
          className={`text-2xl font-semibold w-full text-center text-white p-2 ${OrH1}`}
        >
          {title}
        </h1>
      </header>
    </>
  );
};
