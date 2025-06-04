"use client";
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {SideBar} from "@/components/SideBar";
import {NavBar} from "@/components/NavBar";
import {FaUserCircle} from "react-icons/fa";

const BaseTableSearch = ({
  columns,
  title,
  rows,
  setRows,
  loading,
  style,
  ...props
}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className="flex flex-col h-screen bg-zinc-200 w-full">
      <SideBar user={user} />
      <NavBar user={user} />
      <div className="md:ml-16 mt-14 ">
        <div className="flex justify-start items-center ml-2">
          <FaUserCircle className="text-4xl" />
          <h1 className="text-3xl p-4 font-bold uppercase text-slate-800 ">
            {title}
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <div style={{height: "100%", width: "95%"}}>
            <DataGrid
              rows={rows}
              columns={columns}
              density={"compact"}
              disableColumnMenu
              loading={loading}
              style={style}
              {...props}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseTableSearch;
