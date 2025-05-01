"use client";
import {Button} from "@/components/Button";
import {HeaderH1} from "@/components/HeaderH1";
import {Input} from "@/components/Input";
import {RadioGroup} from "@/components/RadioGroup";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

const CriarAdvertencia = () => {
  const router = useRouter();
  const [servidores, setServidores] = useState([]);
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
  const [alunos, setAlunos] = useState([]);
  useEffect(() => {
    const fetchServidores = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/servidores");
        if (!response.ok) {
          throw new Error("Failed to fetch servidores");
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

    fetchServidores();
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
      if (formData.turma) {
        try {
          const response = await fetch(
            `http://localhost:5000/api/alunos?turma=${formData.turma}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch alunos");
          }
          const data = await response.json();
          const dataFormatada = data.data.map((aluno) => ({
            value: aluno._id,
            label: aluno.nome,
          }));
          setAlunos(dataFormatada); // Atualiza o estado com os alunos da turma
        } catch (error) {
          console.error("Error fetching alunos:", error);
        }
      } else {
        setAlunos([]); // Limpa os alunos se a turma estiver vazia
      }
    };

    fetchAlunos();
  }, [formData.turma]); // Executa sempre que 'formData.turma' mudar

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-zinc-200">
      <HeaderH1 onClick={() => router.back()} title="Criar Advertência" />
      <form className="flex flex-col items-start justify-between w-full p-2">
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
            disabled={formData.turma.length < 3} // Desabilita o campo se a turma estiver vazia
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
            options={[
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
            ]}
          />
          <Input
            label="Data do Comparecimento"
            type="date"
            name="dataComparecimento"
            value={formData.dataComparecimento}
            onChange={handleChange}
          />
        </div>
      </form>
      <Button wfull>Incluir Advertência</Button>
    </div>
  );
};

export default CriarAdvertencia;
