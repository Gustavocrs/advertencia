"use client";
import BaseFormPage from "@/components/BaseFormPage";
import {Button} from "@/components/Button";
import {Input} from "@/components/Input";
import {Notify, notifyError, notifySuccess} from "@/components/Notify";
import {RadioGroup} from "@/components/RadioGroup";
import {useEffect, useState} from "react";
import useRequest from "@/hooks/useRequest";

const CriarAdvertencia = () => {
  const {get, error} = useRequest();
  const [turmas, setTurmas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [formData, setFormData] = useState({
    turma: "",
    aluno: "",
    usuario: "",
    cargo: "",
    data: "",
    motivo: "",
    acaoEsperada: "",
    dataComparecimento: "",
  });
  const [user, setUser] = useState();

  useEffect(() => {
    const userStorage = "";
    if (typeof window !== "undefined") {
      userStorage = localStorage.getItem("user");
    }

    if (userStorage) {
      const userObj = JSON.parse(userStorage);
      setUser(userObj);
      console.log("userObj", userObj);
      setUsuarios([
        {
          value: userObj.value,
          label: userObj.nome,
          cargo: userObj.cargo,
        },
      ]);
      setFormData((prev) => ({
        ...prev,
        usuario: userObj.value,
        cargo: userObj.cargo || "",
      }));
    }
  }, []);

  useEffect(() => {
    const setDefaultDate = () => {
      const today = new Date().toISOString().split("T")[0];
      setFormData((prev) => ({
        ...prev,
        data: today,
      }));
    };

    setDefaultDate();
  }, []);

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

  useEffect(() => {
    const fetchAlunos = async () => {
      if (turmas && formData.turma) {
        const turmaSelecionada = turmas.find(
          (turma) => turma.value === formData.turma
        );
        try {
          const response = await get(
            `api/alunos?turma=${turmaSelecionada.value}`
          );
          if (response?.data) {
            const dataFormatada = response.data.data.map((aluno) => ({
              value: aluno._id,
              label: aluno.nome,
            }));
            setAlunos(dataFormatada);
          }
        } catch {
          notifyError(`${error?.message}`);
          console.log("Error: ", error);
        }
      } else {
        setAlunos([]);
      }
    };

    fetchAlunos();
  }, [formData.turma, turmas]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    if (name === "usuario") {
      const usuarioSelecionado = usuarios.find(
        (usuario) => usuario.value === value
      );
      setFormData((prev) => ({
        ...prev,
        usuario: value,
        cargo: usuarioSelecionado ? usuarioSelecionado.cargo : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    console.log("FormData", formData);
    e.preventDefault(); // Previne o comportamento padrão do formulário
    try {
      const data = JSON.stringify(formData);
      const response = await post(`api/advertencias`, data);

      if (response.data) {
        notifySuccess("Advertência criada com sucesso!");
        setFormData((prev) => ({
          ...prev,
          turma: "",
          aluno: "",
          usuario: prev.usuario,
          cargo: prev.cargo,
          data: "",
          motivo: "",
          acaoEsperada: "",
          dataComparecimento: "",
        }));
      } else {
        const errorData = await response.json();
        notifyError(`Erro ao criar advertência: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      notifyError("Erro ao criar advertência.");
    }
  };
  const optionsAcaoEsperada = [
    {
      value: "0",
      label:
        "Dar ciência neste documento, devolvê-lo para arquivamento e tomar providências para que os fatos narrados não tornem a acontecer.",
    },
    {
      value: "1",
      label:
        "Dar ciência e comparecer à unidade escolar dia e horário abaixo. Na impossibilidade de comparecimento, faça contato com a escola para agendar novo dia e horário.",
    },
  ];

  return (
    <BaseFormPage title="Aplicar Advertência">
      <Notify />
      <form
        className="flex flex-col items-start justify-between w-full p-2"
        onSubmit={handleSubmit} // Adicionado o evento onSubmit
      >
        <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-white shadow-lg rounded-lg">
          <Input
            label="Turma"
            type="select"
            name="turma"
            value={formData.turma}
            onChange={handleChange}
            data={turmas}
          />
          <Input
            label="Aluno"
            type="select"
            name="aluno"
            value={formData.aluno}
            onChange={handleChange}
            data={alunos}
            disabled={formData.turma === ""}
          />
          <Input
            label="Servidor"
            type="text"
            name="usuario_nome"
            value={user ? user.nome : ""}
            disabled
          />
          <Input
            label="Cargo"
            type="text"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            readOnly
          />
          <Input
            label="Data"
            type="date"
            name="data"
            value={formData.data}
            onChange={handleChange}
          />
          <Input
            label="Motivo da Advertência"
            type="textarea"
            name="motivo"
            value={formData.motivo}
            onChange={handleChange}
          />
          <RadioGroup
            label={"Ação esperada do responsável"}
            name="acaoEsperada"
            value={formData.acaoEsperada}
            onChange={handleChange}
            options={optionsAcaoEsperada}
          />

          {formData.acaoEsperada === optionsAcaoEsperada[1].label && (
            <Input
              label="Data do Comparecimento"
              type="date"
              name="dataComparecimento"
              value={formData.dataComparecimento}
              onChange={handleChange}
            />
          )}
        </div>
        <Button wfull type="submit">
          Incluir Advertência
        </Button>
      </form>
    </BaseFormPage>
  );
};

export default CriarAdvertencia;
