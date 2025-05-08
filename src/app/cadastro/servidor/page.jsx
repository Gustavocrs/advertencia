"use client";

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Button} from "@/components/Button";
import {HeaderH1} from "@/components/HeaderH1";
import {Input} from "@/components/Input";
import {fetchEstados} from "@/utils/fetchEstados";
import {fetchMunicipios} from "@/utils/fetchMunicipios";
import {fetchCepData} from "@/utils/fetchCepData";

const IncluirServidor = () => {
  const router = useRouter();

  // Estado para armazenar os valores do formulário
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    cep: "",
    data_nascimento: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    celular: "",
    email: "",
    disciplina: "",
    matricula: "",
    cargo: "",
  });
  const [dataEstados, setDataEstados] = useState([]);
  const [dataMunicipios, setDataMunicipios] = useState([]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  const handleSubmit = async (e) => {
    console.log("FormData", formData);
    const url = process.env.NEXT_PUBLIC_API_URL;

    e.preventDefault(); // Previne o comportamento padrão do formulário
    const response = await fetch(url + "/api/servidores", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Servidor incluído com sucesso!");
      setFormData({
        nome: "",
        cpf: "",
        cep: "",
        data_nascimento: "",
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        celular: "",
        email: "",
        disciplina: "",
        matricula: "",
        cargo: "",
      });
    } else {
      alert("Erro ao incluir servidor.");
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
    <div className="flex flex-col items-center justify-start h-[100%] bg-zinc-200">
      <HeaderH1 onClick={() => router.push("/")} title="Cadastro de Servidor" />
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
            label="Data de Nascimento"
            type="date"
            name="data_nascimento"
            value={formData.data_nascimento}
            onChange={handleChange}
          />
          <Input
            label="CEP"
            type="text"
            name="cep"
            value={formData.cep}
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
            label="Complemento"
            type="text"
            name="complemento"
            value={formData.complemento}
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
            label="Estado"
            type="select"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            data={dataEstados}
          />
          <Input
            label="Cidade"
            type="select"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            data={dataMunicipios}
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
