"use client";

import {useRouter} from "next/navigation";
import {useState} from "react";
import {Button} from "@/components/Button";
import {HeaderH1} from "@/components/HeaderH1";
import {Input} from "@/components/Input";

const IncluirServidor = () => {
  const router = useRouter();

  // Estado para armazenar os valores do formulário
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    celular: "",
    email: "",
    disciplina: "",
    matricula: "",
    cargo: "",
  });

  // Função para atualizar o estado ao digitar nos campos
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  // Função para enviar os dados ao backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    const response = await fetch("http://localhost:5000/api/servidores", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Servidor incluído com sucesso!");
      router.push("/cadastro"); // Redireciona para a página de cadastro
    } else {
      alert("Erro ao incluir servidor.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-zinc-200">
      <HeaderH1 onClick={() => router.back()} title="Cadastro de Servidor" />
      <form
        className="flex flex-col items-start justify-between w-full p-2"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-white shadow-lg rounded-lg">
          <Input
            label="Nome"
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
          <Input
            label="CPF"
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
          />
          <Input
            label="Endereço"
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
          />
          <Input
            label="N°"
            type="number"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
          />
          <Input
            label="Bairro"
            type="text"
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
          />
          <Input
            label="Cidade"
            type="text"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
          />
          <Input
            label="Estado"
            type="text"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
          />
          <Input
            label="Celular"
            type="tel"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Disciplina"
            type="text"
            name="disciplina"
            value={formData.disciplina}
            onChange={handleChange}
          />
          <Input
            label="Matricula"
            type="text"
            name="matricula"
            value={formData.matricula}
            onChange={handleChange}
          />
          <Input
            label="Cargo"
            type="text"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
          />
        </div>
        <Button wfull type="submit">
          Incluir Servidor
        </Button>
      </form>
    </div>
  );
};

export default IncluirServidor;
