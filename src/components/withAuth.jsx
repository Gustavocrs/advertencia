"use client";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {CircularProgress} from "@mui/material";

export default function withAuth(Component) {
  return function ProtectedComponent(props) {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        router.push("/");
        setIsAuth(false);
      } else {
        setIsAuth(true);
      }
    }, [router]);

    if (isAuth === null) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <CircularProgress />
        </div>
      );
    }

    return <Component {...props} />;
  };
}
