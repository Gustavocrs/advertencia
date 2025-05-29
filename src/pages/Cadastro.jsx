import {Button} from "../components/Button";
import {FaUserCircle} from "react-icons/fa";
import {useRouter} from "next/navigation";
import {Card} from "@/components/Card";

const Cadastro = () => {
  const router = useRouter();

  return (
    <div className="w-full">
      <div className={`w-full h-fit py-4 p-2 md:pl-2 flex flex-wrap gap-4`}>
        <Card
          title={"Novo Usuário"}
          icon={<FaUserCircle />}
          onClick={() => router.push("cadastro/usuario")}
        />
      </div>
    </div>
  );
};

export default Cadastro;
