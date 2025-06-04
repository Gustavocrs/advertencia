"use client";

import {CircularProgress} from "@mui/material";

export const Button = ({
  children,
  wfull,
  style = "bg-slate-800 text-slate-200",
  loading,
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
      {loading ? <CircularProgress /> : children}
    </button>
  );
};

const buttonStyle = `h-14 text-white text-lg p-2 my-2 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:cursor-pointer hover:bg-slate-700`;
