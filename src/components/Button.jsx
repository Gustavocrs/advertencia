"use client";
export const Button = ({children, wfull, style = "bg-sky-600 ", ...props}) => {
  return (
    <button
      className={
        wfull
          ? buttonStyle + " w-full " + style
          : buttonStyle + " w-28 rounded hover:scale-105 " + style
      }
      {...props}
    >
      {children}
    </button>
  );
};

const buttonStyle =
  "h-16 text-white text-base p-2 my-2 shadow-lg transition duration-300 ease-in-out transform hover:cursor-pointer";
