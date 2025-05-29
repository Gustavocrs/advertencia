"use client";
export const Button = ({
  children,
  wfull,
  style = "bg-slate-800 text-slate-200",
  ...props
}) => {
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

const buttonStyle = `h-14 text-white text-lg p-2 my-2 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:cursor-pointer hover:bg-slate-700`;
