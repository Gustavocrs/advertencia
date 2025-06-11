"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function withAuth(Component) {
  return function ProtectedComponent(props) {
    const router = useRouter();

    useEffect(() => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        router.push("/");
      }
    }, [router]);

    return <Component {...props} />;
  };
}
