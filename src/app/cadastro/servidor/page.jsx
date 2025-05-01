"use client";

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Button} from "@/components/Button";
import {HeaderH1} from "@/components/HeaderH1";
import {Input} from "@/components/Input";

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
    e.preventDefault(); // Previne o comportamento padrão do formulário
    const response = await fetch("http://localhost:5000/api/servidores", {
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
  const fetchEstados = async () => {
    try {
      const response = await fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );
      if (response.ok) {
        const estados = await response.json();
        const estadosFormatados = estados.map((estado) => ({
          label: estado.sigla,
          value: estado.sigla,
        }));
        setDataEstados(estadosFormatados);
      } else {
        console.error("Erro ao buscar os estados.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };
  const fetchMunicipios = async (estado) => {
    try {
      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`
      );
      if (response.ok) {
        const municipios = await response.json();
        const municipiosFormatados = municipios.map((municipio) => ({
          label: municipio.nome,
          value: municipio.nome,
        }));
        setFormData((prevData) => ({
          ...prevData,
          cidade: "",
        }));
        setDataMunicipios(municipiosFormatados);
      } else {
        console.error("Erro ao buscar os municípios.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };
  const fetchCepData = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.ok) {
        const data = await response.json();

        if (!data.erro) {
          setFormData((prevData) => ({
            ...prevData,
            endereco: data.logradouro || "",
            bairro: data.bairro || "",
            cidade: data.localidade || "",
            estado: data.uf || "",
          }));

          // Atualiza os municípios com a cidade retornada pela API
          setDataMunicipios([{label: data.localidade, value: data.localidade}]);

          // Foca no campo "número" após preencher os dados
          setTimeout(() => {
            document.querySelector('input[name="numero"]').focus();
          }, 0);
        } else {
          alert("CEP não encontrado.");
        }
      } else {
        console.error("Erro ao buscar o CEP.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  useEffect(() => {
    if (formData.cep.length === 8) {
      fetchCepData(formData.cep);
    }
  }, [formData.cep]);

  useEffect(() => {
    fetchEstados();

    if (formData.cep.length < 8) {
      if (formData.estado) {
        fetchMunicipios(formData.estado);
      }
    }
  }, [formData.estado, formData.cep]);

  return (
    <div className="flex flex-col items-center justify-start h-[100%] bg-zinc-200">
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
