"use client";
import {Button} from "@/components/Button";
import {HeaderH1} from "@/components/HeaderH1";
import {Input} from "@/components/Input";
import {RadioGroup} from "@/components/RadioGroup";
import {useRouter} from "next/navigation";

const CriarAdvertencia = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-zinc-200">
      <HeaderH1 onClick={() => router.back()} title="Criar Advertência" />
      <form className="flex flex-col items-start justify-between w-full p-2">
        <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-white shadow-lg rounded-lg">
          <Input label="Turma" type="text" />
          <Input label="Aluno" type="text" />
          <Input label="Servidor" type="text" />
          <Input label="Cargo" type="text" />
          <Input label="Data" type="date" />
          <Input label="Motivo da Advertência" type="textarea" />
          <RadioGroup
            label={"Ação esperada do responsável"}
            options={[
              {
                value: "0",
                label:
                  "Dar ciência neste documento, devolvê-lo para arquivamento e tomar providencias para que os fatos narrados não tornem a acontecer.",
              },
              {
                value: "1",
                label:
                  "Dar ciência e comparecer à unidade escolar dia e horário abaixo. Na impossibilidade de comparecimento, faça contato com a escola para agendar novo dia e horário",
              },
            ]}
          />
          <Input label="Data do Comparecimento" type="date" />
        </div>
      </form>
      <Button wfull>Incluir Advertência</Button>
    </div>
  );
};

export default CriarAdvertencia;
