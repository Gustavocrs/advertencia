"use client";

import {Button} from "@/components/Button";
import {Input} from "@/components/Input";
import {useEffect, useState} from "react";
import BaseFormPage from "@/components/BaseFormPage";
import BaseFormCadastro from "@/components/BaseFormCadastro";
import useRequest from "@/hooks/useRequest";
import {Notify, notifySuccess, notifyError} from "@/components/Notify";

const IncluirAluno = () => {
  const {post, get, error, loading} = useRequest();
  const [turmas, setTurmas] = useState([]);
  const [formData, setFormData] = useState({
    nome: "João Pereira",
    data_nascimento: "2012-05-15",
    cpf: "12345678901", // somente números
    cep: "30140071", // somente números, válido de BH (Centro)
    endereco: "Avenida Afonso Pena", // endereço correspondente ao CEP 30140071
    numero: "1000",
    complemento: "Apto 202",
    bairro: "Centro",
    cidade: "Belo Horizonte",
    estado: "MG",
    celular: "31987654321", // somente números
    turma: "",
    matricula: "20253456",
    responsavel: {
      nome: "Carlos Pereira",
      celular1: "31991234567", // somente números
      celular2: "31992345678", // somente números
      email: "carlos.pereira@email.com",
    },
  });

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await get("api/turmas");
        const turmasFormatadas = response.data.data.map((turma) => ({
          value: turma._id,
          label: turma.nome,
        }));
        setTurmas(turmasFormatadas);
      } catch {
        notifyError(`${error?.message}`);
        console.log("Error: ", error);
      }
    };
    fetchTurmas();
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;
    if (name.startsWith("responsavel.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        responsavel: {
          ...prev.responsavel,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await post("api/alunos", JSON.stringify(formData));
      if (response?.data) {
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
      notifyError(`${error?.message}`);
      console.log("Error: ", error);
    }
  };

  return (
    <BaseFormPage title="Cadastro de Aluno">
      <Notify />
      <form
        className="flex flex-col items-start justify-between w-full p-2"
        onSubmit={handleSubmit}
      >
        <BaseFormCadastro
          otherFields={
            <>
              <Input
                label="Turma"
                type="select"
                name="turma"
                value={formData.turma}
                onChange={handleChange}
                data={turmas}
              />

              <Input
                label="Matrícula"
                type="text"
                name="matricula"
                value={formData.matricula}
                onChange={handleChange}
              />
              <div className="mt-4 mb-2 font-bold uppercase text-slate-900 text-xl">
                Dados do Responsável
              </div>
              <Input
                label="Nome"
                type="text"
                name="responsavel.nome"
                value={formData.responsavel.nome}
                onChange={handleChange}
              />
              <Input
                label="Celular 1 (Whatsapp)"
                type="cel"
                name="responsavel.celular1"
                value={formData.responsavel.celular1}
                onChange={handleChange}
              />
              <Input
                label="Celular 2"
                type="cel"
                name="responsavel.celular2"
                value={formData.responsavel.celular2}
                onChange={handleChange}
              />
              <Input
                label="E-mail"
                type="email"
                name="responsavel.email"
                value={formData.responsavel.email}
                onChange={handleChange}
              />
            </>
          }
          formData={formData}
          setFormData={setFormData}
          onChange={handleChange}
        />
        <Button wfull type="submit" loading={loading}>
          Incluir Aluno
        </Button>
      </form>
    </BaseFormPage>
  );
};

export default IncluirAluno;
