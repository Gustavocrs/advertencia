import {Button} from "../components/Button";

export const Consultas = ({router}) => {
  return (
    <div className="w-full">
      <h1
        className={`text-2xl font-semibold text-center bg-sky-900 text-white p-2`}
      >
        Consultas
      </h1>
      <div
        className={`w-full h-fit py-4 flex flex-wrap justify-center items-center gap-4`}
      >
        <Button onClick={() => router.push("consulta/aluno")}>Alunos</Button>
        <Button onClick={() => router.push("consulta/responsavel")}>
          Responsáveis
        </Button>
        <Button onClick={() => router.push("consulta/servidor")}>
          Servidores
        </Button>
      </div>
    </div>
  );
};
