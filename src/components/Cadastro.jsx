import {Button} from "./Button";

export const Cadastro = ({router}) => {
  return (
    <div className="w-full">
      <h1 className={h1Style}>Cadastro</h1>
      <div className={DivAreaStyle}>
        <Button onClick={() => router.push("cadastro/incluiraluno")}>
          Incluir Aluno
        </Button>
        <Button onClick={() => router.push("cadastro/incluirresponsavel")}>
          Incluir Responsável
        </Button>
        <Button onClick={() => router.push("cadastro/incluirservidor")}>
          Incluir Servidor
        </Button>
        <Button onClick={() => router.push("cadastro/incluirunidade")}>
          Incluir Unidade
        </Button>
      </div>
    </div>
  );
};

const h1Style = "text-2xl font-semibold text-center bg-sky-900 text-white p-2";

const DivAreaStyle = "flex flex-wrap justify-center items-center";
