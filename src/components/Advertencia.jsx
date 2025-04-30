import {Button} from "./Button";

export const Advertencia = ({router}) => {
  return (
    <div className="w-full">
      <h1 className={h1Style}>Advertências</h1>
      <div className={DivAreaStyle}>
        <Button>Criar</Button>
        <Button>Consultar</Button>
      </div>
    </div>
  );
};

const h1Style = "text-2xl font-semibold text-center bg-sky-900 text-white p-2";

const DivAreaStyle = "flex flex-wrap justify-center items-center";
