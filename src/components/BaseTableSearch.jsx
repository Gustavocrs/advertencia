"use client";
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {SideBar} from "@/components/SideBar";
import {NavBar} from "@/components/NavBar";
import {FaUserCircle} from "react-icons/fa";
import AlertDialog from "./AlertDialog";
import {IoMdArrowRoundBack} from "react-icons/io";
import {useRouter} from "next/navigation";

const BaseTableSearch = ({
  columns,
  title,
  rows,
  setRows,
  setReload,
  loading,
  style,
  state,
  setState,
  itemId,
  isPrint,
  url,
  icon,
  ...props
}) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-zinc-200 w-full">
      <SideBar user={user} />
      <NavBar user={user} />
      <div className="md:ml-16 mt-14 ">
        <div className="flex justify-start gap-5 items-center ml-2">
          <IoMdArrowRoundBack
            className="text-2xl cursor-pointer"
            onClick={() => router.back()}
          />
          {icon ? (
            icon
          ) : (
            <div className="text-4xl">
              <FaUserCircle />
            </div>
          )}

          <h1 className="text-2xl p-4 font-bold uppercase text-slate-800 ">
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
              sx={{cursor: "pointer"}}
              {...props}
            />
          </div>
        </div>
      </div>
      <AlertDialog
        state={state}
        setState={setState}
        itemId={itemId}
        setReload={setReload}
        isPrint={isPrint}
        url={url}
      />
    </div>
  );
};

export default BaseTableSearch;
