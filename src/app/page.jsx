"use client";
import {Button} from "@/components/Button";
import {Input} from "@/components/Input";
import {ToastContainer, toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import useRequest from "@/hooks/useRequest";

export default function Home() {
  const router = useRouter();
  const {post, error, loading} = useRequest();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!event.target.login.value.trim() || !event.target.senha.value.trim()) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    try {
      let data = JSON.stringify({
        email: event.target.login.value.trim(),
        password: event.target.senha.value.trim(),
      });
      const response = await post(`api/auth`, data);

      console.log("response", response.data);

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.usuario));
        router.push("/principal");
      } else {
        toast.error("Login ou senha inválidos");
      }
    } catch {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-zinc-200 w-full">
      <div className="w-full h-full flex flex-col justify-center items-center bg-zinc-300">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="w-full flex justify-around mb-4">
          <img src="/file.svg" alt="Logo-Escola" className="w-24 h-24 mb-4" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-4 p-8 bg-white rounded-lg shadow-md sm:p-12 w-[90%] md:w-[40%]"
        >
          <Input
            label="Usuario"
            name="login"
            placeholder="seu@email.com"
            //   value={formData.numero}
            //   onChange={handleChange}
          />
          <Input
            label="Senha"
            name="senha"
            type="password"
            placeholder="********"
            //   value={formData.numero}
            //   onChange={handleChange}
          />
          <Button wfull type="submit">
            {loading ? <CircularProgress /> : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
