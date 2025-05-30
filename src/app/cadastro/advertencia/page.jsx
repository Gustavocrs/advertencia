"use client";
import {Button} from "@/components/Button";
import {HeaderH1} from "@/components/HeaderH1";
import {Input} from "@/components/Input";
import {NavBar} from "@/components/NavBar";
import {RadioGroup} from "@/components/RadioGroup";
import {SideBar} from "@/components/SideBar";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {FaUserCircle} from "react-icons/fa";

const CriarAdvertencia = () => {
  const router = useRouter();
  const [servidores, setServidores] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [formData, setFormData] = useState({
    turma: "",
    aluno: "",
    servidor: "",
    cargo: "",
    data: "",
    motivo: "",
    acaoEsperada: "",
    dataComparecimento: "",
  });

  useEffect(() => {
    const fetchUsuarios = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/usuarios`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch usuarios");
        }
        const data = await response.json();
        const dataFormatada = data.data.map((servidor) => ({
          value: servidor._id,
          label: servidor.nome,
          cargo: servidor.cargo,
        }));
        setServidores(dataFormatada);
      } catch (error) {
        console.error("Error fetching servidores:", error);
      }
    };

    fetchUsuarios();
  }, []);

  useEffect(() => {
    const fetchCargo = async () => {
      if (formData.servidor) {
        setFormData((prev) => ({
          ...prev,
          cargo:
            servidores.find((servidor) => servidor.value === formData.servidor)
              ?.cargo || "",
        }));
      }
    };

    fetchCargo();
  }, [formData.servidor]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        setFormData({
          turma: "",
          aluno: "",
          servidor: "",
          cargo: "",
          data: "",
          motivo: "",
          acaoEsperada: "",
          dataComparecimento: "",
        });
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
    <div className="flex flex-col h-fit bg-zinc-200 w-full">
      <SideBar />
      <NavBar />
      <div className="md:ml-16 mt-14 ">
        <div className="flex justify-start items-center ml-2">
          <FaUserCircle className="text-4xl" />
          <h1 className="text-3xl p-4 font-bold uppercase text-slate-800 ">
            Aplicar Advertência
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center h-full">
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
                type="select"
                name="servidor"
                value={formData.servidor}
                onChange={handleChange}
                data={servidores}
              />
              <Input
                label="Cargo"
                type="text"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
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
        </div>
      </div>
    </div>
  );
};

export default CriarAdvertencia;
