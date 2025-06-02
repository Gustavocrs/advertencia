"use client";
import {Button} from "@/components/Button";
import {Input} from "@/components/Input";
import {ToastContainer, toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    if (!event.target.login.value || !event.target.senha.value) {
      toast.error("Por favor, preencha todos os campos.");
      setLoading(false);

      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: event.target.login.value,
            password: event.target.senha.value,
          }),
        }
      );
      const data = await response.json();
      if (data && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.usuario));
      } else {
        toast.error("Login ou senha inválidos");
        setLoading(false);
      }
      if (response.ok) {
        router.push("/principal");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
