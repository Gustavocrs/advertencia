"use client";

import {useRouter} from "next/navigation";
import {Button} from "@/components/Button";
import {Input} from "@/components/Input";
import {HeaderH1} from "@/components/HeaderH1";
import {useEffect, useState} from "react";
import {fetchCepData} from "@/utils/fetchCepData";
import {fetchEstados} from "@/utils/fetchEstados";
import {fetchMunicipios} from "@/utils/fetchMunicipios";

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
    e.preventDefault(); // Previne o comportamento padrão do formulário
    try {
      const response = await fetch("http://localhost:5000/api/alunos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

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
    <div className="flex flex-col items-center justify-start h-screen bg-zinc-200">
      <HeaderH1 onClick={() => router.push("/")} title="Cadastro de Aluno" />
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
            data={dataMunicipios}
          />
          <Input
            label="Estado"
            type="text"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            data={dataEstados}
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
            label="CPF do Responsável"
            type="text"
            name="responsavelCpf"
            value={formData.responsavelCpf}
            onChange={handleChange}
          />
          <Input
            label="Data de Nascimento"
            type="date"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
          />
          <Input
            label="Turma"
            type="text"
            name="turma"
            value={formData.turma}
            onChange={handleChange}
          />
        </div>
        <Button wfull type="submit">
          Incluir Aluno
        </Button>
      </form>
    </div>
  );
};

export default IncluirAluno;
