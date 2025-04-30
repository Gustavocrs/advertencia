"use client";

import {IoMdArrowRoundBack} from "react-icons/io";
import {useRouter} from "next/navigation";
import {Button} from "@/components/Button";
import {HeaderH1} from "@/components/HeaderH1";
import {Input} from "@/components/Input";

const IncluirServidor = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-zinc-200">
      <HeaderH1 onClick={() => router.back()} title="Cadastro de Servidor" />
      <form className="flex flex-col items-start justify-between w-full p-2">
        <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-white shadow-lg rounded-lg">
          <Input label="Nome" type="text" />
          <Input label="CPF" type="text" />
          <Input label="Endereço" type="text" />
          <Input label="N°" type="number" />
          <Input label="Bairro" type="text" />
          <Input label="Cidade" type="text" />
          <Input label="Estado" type="text" />
          <Input label="Celular" type="tel" />
          <Input label="Email" type="email" />
          <Input label="Disciplina" type="text" />
          <Input label="Matricula" type="text" />
        </div>
      </form>
      <Button wfull>Incluir Servidor</Button>
    </div>
  );
};

export default IncluirServidor;

const h1Style =
  "text-2xl font-semibold w-full text-center bg-sky-900 text-white p-2";

const DivAreaStyle =
  "flex items-center justify-center w-full h-16 bg-sky-900 text-white p-4 shadow-lg mb-4 hover:cursor-pointer transition duration-300 ease-in-out text-2xl";

const DivFormStyle = "";
