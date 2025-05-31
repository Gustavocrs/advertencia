"use client";

import {useRouter} from "next/navigation";
import {Button} from "@/components/Button";
import {Input} from "@/components/Input";
import {HeaderH1} from "@/components/HeaderH1";
import {useEffect, useState} from "react";
import {fetchCepData} from "@/utils/fetchCepData";
import {fetchEstados} from "@/utils/fetchEstados";
import {fetchMunicipios} from "@/utils/fetchMunicipios";
import BaseFormPage from "@/components/BaseFormPage";
import BaseFormCadastro from "@/components/BaseFormCadastro";

const IncluirAluno = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    cep: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    celular: "",
    email: "",
    responsavelCpf: "",
    dataNascimento: "",
    turma: "",
  });
  const [dataEstados, setDataEstados] = useState([]);
  const [dataMunicipios, setDataMunicipios] = useState([]);
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/alunos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Aluno incluído com sucesso!");
        setFormData({
          nome: "",
          cpf: "",
          endereco: "",
          numero: "",
          bairro: "",
          cidade: "",
          estado: "",
          celular: "",
          email: "",
          responsavelCpf: "",
          dataNascimento: "",
          turma: "",
        });
      } else {
        const errorData = await response.json();
        alert(`Erro ao incluir aluno: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      alert("Erro ao incluir aluno. Tente novamente mais tarde.");
    }
  };

  useEffect(() => {
    if (formData.cep.length === 8) {
      fetchCepData(formData.cep, setDataMunicipios, setFormData);
    }
  }, [formData.cep]);

  useEffect(() => {
    fetchEstados(setDataEstados);

    if (formData.cep.length < 8) {
      if (formData.estado) {
        fetchMunicipios(formData.estado, setDataMunicipios, setFormData);
      }
    }
  }, [formData.estado, formData.cep]);

  return (
    <BaseFormPage title="Cadastro de Aluno">
      <form
        className="flex flex-col items-start justify-between w-full p-2"
        onSubmit={handleSubmit}
      >
        <BaseFormCadastro
          otherFields={
            <>
              <Input
                label="Turma"
                type="text"
                name="turma"
                value={formData.turma}
                onChange={handleChange}
              />
              <Input
                label="CPF do Responsável"
                type="text"
                name="responsavelCpf"
                value={formData.responsavelCpf}
                onChange={handleChange}
              />
            </>
          }
          formData={formData}
          setFormData={setFormData}
          onChange={handleChange}
        />
        <Button wfull type="submit">
          Incluir Aluno
        </Button>
      </form>
    </BaseFormPage>
  );
};

export default IncluirAluno;
