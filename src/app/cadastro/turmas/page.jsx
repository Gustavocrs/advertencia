"use client";
import BaseFormPage from "@/components/BaseFormPage";
import {Button} from "@/components/Button";
import {Input} from "@/components/Input";
import {Notify, notifySuccess, notifyError} from "@/components/Notify";
import useRequest from "@/hooks/useRequest";
import {useState} from "react";
import withAuth from "@/components/withAuth";

const Turmas = () => {
  const {loading, error, post} = useRequest();
  const [formData, setFormData] = useState({nome: "", ano: ""});

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await post("api/turmas", JSON.stringify(formData));
      if (response.data) {
        notifySuccess(response.data.message);
        setFormData({nome: "", ano: ""});
      }
    } catch {
      notifyError(`${error?.message}`);
      console.log("Error: ", error);
    }
  };

  return (
    <BaseFormPage title="Cadastro de Turmas">
      <Notify />
      <form
        className="flex flex-col justify-between w-full p-2"
        onSubmit={handleSubmit}
      >
        <div>
          <Input
            label="Nome"
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
          <Input
            label="Ano"
            type="number"
            name="ano"
            value={formData.ano}
            onChange={handleChange}
          />
        </div>
        <Button wfull type="submit" loading={loading}>
          Incluir Turma
        </Button>
      </form>
    </BaseFormPage>
  );
};

export default withAuth(Turmas);
