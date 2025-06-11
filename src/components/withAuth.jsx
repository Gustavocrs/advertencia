"use client";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {CircularProgress} from "@mui/material";

export default function withAuth(Component) {
  return function ProtectedComponent(props) {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(null);
    const [showComponent, setShowComponent] = useState(false);

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

    useEffect(() => {
      if (isAuth) {
        const timer = setTimeout(() => setShowComponent(true), 1000);
        return () => clearTimeout(timer);
      }
    }, [isAuth]);

    if (isAuth === null || (isAuth && !showComponent)) {
      return (
        <div className="w-screen h-screen flex justify-center items-center">
          <CircularProgress />
        </div>
      );
    }

    return <Component {...props} />;
  };
}
