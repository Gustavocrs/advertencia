"use client";
import {useRouter} from "next/navigation";
import {Login} from "@/pages/Login";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center h-screen bg-zinc-200 w-full">
      <Login router={router} />
    </div>
  );
}
