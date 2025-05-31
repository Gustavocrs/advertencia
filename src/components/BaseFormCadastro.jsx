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

const BaseFormCadastro = ({otherFields, formData, setFormData, onChange}) => {
  const [dataEstados, setDataEstados] = useState([]);
  const [dataMunicipios, setDataMunicipios] = useState([]);
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
    <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-white shadow-lg rounded-lg">
      <Input
        label="Nome"
        type="text"
        name="nome"
        value={formData.nome || ""}
        onChange={onChange}
      />
      <Input
        label="CPF"
        type="text"
        name="cpf"
        value={formData.cpf || ""}
        onChange={onChange}
      />

      <Input
        label="Data de Nascimento"
        type="date"
        name="data_nascimento"
        value={formData.data_nascimento || ""}
        onChange={onChange}
      />
      <Input
        label="CEP"
        type="text"
        name="cep"
        value={formData.cep || ""}
        onChange={onChange}
      />
      <Input
        label="Endereço"
        type="text"
        name="endereco"
        value={formData.endereco || ""}
        onChange={onChange}
      />
      <Input
        label="N°"
        type="number"
        name="numero"
        value={formData.numero || ""}
        onChange={onChange}
      />
      <Input
        label="Complemento"
        type="text"
        name="complemento"
        value={formData.complemento || ""}
        onChange={onChange}
      />
      <Input
        label="Bairro"
        type="text"
        name="bairro"
        value={formData.bairro || ""}
        onChange={onChange}
      />
      <Input
        label="Estado"
        type="select"
        name="estado"
        value={formData.estado || ""}
        onChange={onChange}
        data={dataEstados}
      />
      <Input
        label="Cidade"
        type="select"
        name="cidade"
        value={formData.cidade || ""}
        onChange={onChange}
        data={dataMunicipios}
      />
      <Input
        label="Celular"
        type="tel"
        name="celular"
        value={formData.celular || ""}
        onChange={onChange}
      />

      {otherFields}
    </div>
  );
};

export default BaseFormCadastro;
