"use client";

import {useRouter} from "next/navigation";
import {Button} from "@/components/Button";
import {Input} from "@/components/Input";
import {HeaderH1} from "@/components/HeaderH1";

const IncluirAluno = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-zinc-200">
      <HeaderH1 onClick={() => router.back()} title="Cadastro de Aluno" />
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
          <Input label="CPF do Responsável" type="search" />
        </div>
      </form>
      <Button wfull>Incluir Aluno</Button>
    </div>
  );
};

export default IncluirAluno;
