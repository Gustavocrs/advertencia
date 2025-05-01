import {Button} from "../components/Button";

export default function Cadastro({router}) {
  return (
    <div className="w-full">
      <h1
        className={`text-2xl font-semibold text-center bg-sky-900 text-white p-2`}
      >
        Cadastro
      </h1>
      <div
        className={`w-full h-fit py-4 flex flex-wrap justify-center items-center gap-4`}
      >
        <Button onClick={() => router.push("cadastro/aluno")}>Aluno</Button>
        <Button onClick={() => router.push("cadastro/responsavel")}>
          Responsável
        </Button>
        <Button onClick={() => router.push("cadastro/servidor")}>
          Servidor
        </Button>
        {/* <Button onClick={() => router.push("cadastro/unidade")}>
          Incluir Unidade
        </Button> */}
      </div>
    </div>
  );
}
