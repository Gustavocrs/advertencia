import {Button} from "@/components/Button";
import {Input} from "@/components/Input";
import {ToastContainer, toast} from "react-toastify";

const Login = ({router}) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!event.target.login.value || !event.target.senha.value) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }
    router.push("/principal");
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-zinc-300">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-full flex justify-around mb-4">
        <img src="/file.svg" alt="Logo-Escola" className="w-24 h-24 mb-4" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md flex flex-col justify-center items-center gap-4 p-8 bg-white rounded-lg shadow-md sm:p-12 sm:w-full"
      >
        <Input
          label="Usuario"
          name="login"
          placeholder="seu@email.com"
          //   value={formData.numero}
          //   onChange={handleChange}
        />
        <Input
          label="Senha"
          name="senha"
          type="password"
          placeholder="********"
          //   value={formData.numero}
          //   onChange={handleChange}
        />
        <Button wfull type="submit">
          Entrar
        </Button>
      </form>
    </div>
  );
};
export default Login;