import {Button} from "./Button";

export const Advertencia = ({router}) => {
  return (
    <div className="w-full">
      <h1
        className={`text-2xl font-semibold text-center bg-sky-900 text-white p-2`}
      >
        Advertências
      </h1>
      <div className={`flex flex-wrap justify-center items-center`}>
        <Button onClick={() => router.push("advertencias/criar")}>Criar</Button>
        <Button onClick={() => router.push("advertencias/consultar")}>
          Consultar
        </Button>
      </div>
    </div>
  );
};
