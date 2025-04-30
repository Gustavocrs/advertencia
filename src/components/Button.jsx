"use client";
export const Button = ({children, wfull, style = "bg-sky-600 ", ...props}) => {
  return (
    <button
      className={
        wfull
          ? buttonStyle + " w-screen font-medium text-lg " + style
          : buttonStyle + " w-28 rounded hover:scale-105 " + style
      }
      {...props}
    >
      {children}
    </button>
  );
};

const buttonStyle =
  " h-15 hover:bg-sky-800 min-w-26 text-white text-md py-2 px-8 m-4 flex justify-center items-center shadow-lg transition duration-300 ease-in-out transform hover:cursor-pointer";
