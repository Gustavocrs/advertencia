import {Button} from "@/components/Button";
import {Input} from "@/components/Input";

export const Login = ({router}) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-zinc-300">
      <div className="w-96 h-96 p-4 rounded-lg flex flex-col justify-center items-center bg-white">
        <img src="" alt="Logo-Escola" />
        <img src="" alt="Logo-Advertencia" />
        <form action="">
          <Input
            label="Login"
            name="login"
            //   value={formData.numero}
            //   onChange={handleChange}
          />
          <Input
            label="Senha"
            name="senha"
            type="password"
            //   value={formData.numero}
            //   onChange={handleChange}
          />
          <Button wfull type="submit">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
};
