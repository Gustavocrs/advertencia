"use client";
import BaseFormPage from "@/components/BaseFormPage";
import {Button} from "@/components/Button";
import {Input} from "@/components/Input";
import {Notify} from "@/components/Notify";
import useRequest from "@/hooks/useRequest";
import {useState} from "react";

export default function turmas() {
  const {loading} = useRequest();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await post("api/alunos", JSON.stringify(formData));
      if (response?.ok) {
        notifySuccess("Aluno incluído com sucesso!");
        setFormData({
          nome: "",
          data_nascimento: "",
          cpf: "",
          cep: "",
          endereco: "",
          numero: "",
          complemento: "",
          bairro: "",
          cidade: "",
          estado: "",
          celular: "",
          turma: "",
          matricula: "",
          responsavel: {
            nome: "",
            celular1: "",
            celular2: "",
            email: "",
          },
        });
      }
    } catch {
      notifyError(`${error?.message} - ${error?.error}`);
      console.log("Error: ", error);
    }
  };
  return (
    <BaseFormPage title="Cadastro de Turmas">
      <Notify />
      <form
        className="flex flex-col items-start justify-between w-full p-2"
        onSubmit={handleSubmit}
      >
        <Input
          label="Nome"
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
        />
        <Input
          label="Ano"
          type="text"
          name="ano"
          value={formData.ano}
          onChange={handleChange}
        />
        <Button wfull type="submit" loading={loading}>
          Incluir Turma
        </Button>
      </form>
    </BaseFormPage>
  );
}
