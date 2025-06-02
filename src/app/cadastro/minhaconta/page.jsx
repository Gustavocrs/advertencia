"use client";

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Button} from "@/components/Button";
import {Input} from "@/components/Input";
import {fetchEstados} from "@/utils/fetchEstados";
import {fetchMunicipios} from "@/utils/fetchMunicipios";
import {fetchCepData} from "@/utils/fetchCepData";
import BaseFormPage from "@/components/BaseFormPage";

const MinhaConta = () => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    disciplina: "",
    matricula: "",
    cargo: "",
  });
  const [dataEstados, setDataEstados] = useState([]);
  const [dataMunicipios, setDataMunicipios] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (userStorage) {
      const userObj = JSON.parse(userStorage);
      console.log(userObj);
      setUser(userObj);

      const fetchUserData = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/${userObj.value}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setFormData({
            ...formData,
            ...data,
            password: "",
          });
        }
      };
      fetchUserData();
    }
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  const handleSubmit = async (e) => {
    console.log("FormData", formData);
    const token = localStorage.getItem("token");
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/usuarios`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      alert("Usuário incluído com sucesso!");
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
        password: "",
      });
    } else {
      alert("Erro ao incluir usuário.");
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
    <BaseFormPage title="Minha Conta">
      <h1 className="text-left w-full">Aqui você pode alterar sua senha.</h1>
      <form className="flex flex-col  w-full p-2" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full h-full p-4 bg-white shadow-lg rounded-lg">
          <Input
            label="Senha"
            type="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            label="Nome"
            type="text"
            name="nome"
            value={formData.nome}
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
          Salvar Usuário
        </Button>
      </form>
    </BaseFormPage>
  );
};

export default MinhaConta;
