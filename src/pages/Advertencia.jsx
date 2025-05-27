import {Button} from "../components/Button";
import {useRouter} from "next/navigation";

const Advertencia = () => {
  const router = useRouter();

  return (
    <div className="w-full">
      <h1
        className={`text-2xl font-semibold text-center bg-sky-900 text-white p-2`}
      >
        Advertências
      </h1>
      <div
        className={`w-full h-fit py-4 flex flex-wrap justify-center items-center gap-4`}
      >
        <Button onClick={() => router.push("advertencias/criar")}>Criar</Button>
        <Button onClick={() => router.push("advertencias/consultar")}>
          Consultar
        </Button>
      </div>
    </div>
  );
};

export default Advertencia;
