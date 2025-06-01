"use client";
import BaseFormPage from "@/components/BaseFormPage";
import {Button} from "@/components/Button";
import {Input} from "@/components/Input";
import {RadioGroup} from "@/components/RadioGroup";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

const CriarAdvertencia = () => {
  const router = useRouter();
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
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (userStorage) {
      const userObj = JSON.parse(userStorage);
      setUser(userObj);
      setUsuarios([
        {
          value: userObj.id || userObj._id,
          label: userObj.nome,
          cargo: userObj.cargo,
        },
      ]);
      setFormData((prev) => ({
        ...prev,
        usuario: userObj.id || userObj._id,
        cargo: userObj.cargo || "",
      }));
    }
  }, []);

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
    const fetchAlunos = async () => {
      const token = localStorage.getItem("token");
      if (formData.turma) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/alunos?turma=${formData.turma}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch alunos");
          }
          const data = await response.json();
          const dataFormatada = data.data.map((aluno) => ({
            value: aluno._id,
            label: aluno.nome,
          }));
          setAlunos(dataFormatada);
        } catch (error) {
          console.error("Error fetching alunos:", error);
        }
      } else {
        setAlunos([]);
      }
    };

    fetchAlunos();
  }, [formData.turma]);

  const handleSubmit = async (e) => {
    console.log("FormData", formData);
    const token = localStorage.getItem("token");
    e.preventDefault(); // Previne o comportamento padrão do formulário
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/advertencias`,
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
        alert("Advertência criada com sucesso!");
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
        alert(`Erro ao criar advertência: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      alert("Erro ao criar advertência. Tente novamente mais tarde.");
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
      <form
        className="flex flex-col items-start justify-between w-full p-2"
        onSubmit={handleSubmit} // Adicionado o evento onSubmit
      >
        <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-white shadow-lg rounded-lg">
          <Input
            label="Turma"
            type="text"
            name="turma"
            value={formData.turma}
            onChange={handleChange}
          />
          <Input
            label="Aluno"
            type="select"
            name="aluno"
            value={formData.aluno}
            onChange={handleChange}
            data={alunos}
            disabled={formData.turma.length < 3}
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
