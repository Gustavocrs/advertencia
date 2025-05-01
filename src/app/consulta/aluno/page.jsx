"use client";
import {HeaderH1} from "@/components/HeaderH1";
import {useRouter} from "next/navigation";
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";

const ConsultarAluno = () => {
  const router = useRouter();
  const [rows, setRows] = useState([]); // Estado para armazenar os dados
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/alunos");
        if (!response.ok) {
          throw new Error("Erro ao buscar alunos");
        }
        const data = await response.json();

        // Formata os dados para o DataGrid
        const formattedData = data.data.map((aluno, index) => ({
          id: aluno._id || index, // Usa o _id como ID ou o índice como fallback
          nome: aluno.nome || "",
          matricula: aluno.matricula || "",
          turma: aluno.turma || "",
          data_nascimento: aluno.data_nascimento
            ? new Date(aluno.data_nascimento).toLocaleDateString("pt-BR")
            : "Data não informada",
          endereco: aluno.endereco || "",
          cidade: aluno.cidade || "",
          estado: aluno.estado || "",
          responsavel_nome: aluno.responsavel?.nome || "",
          responsavel_celular: aluno.responsavel?.celular || "",
          responsavel_email: aluno.responsavel?.email || "",
        }));

        setRows(formattedData);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };
    fetchAluno();
  }, []);

  const columns = [
    {field: "nome", headerName: "Nome do Aluno", width: 200},
    {field: "matricula", headerName: "Matrícula", width: 150},
    {field: "turma", headerName: "Turma", width: 150},
    {field: "data_nascimento", headerName: "Data de Nascimento", width: 180},
    {field: "endereco", headerName: "Endereço", width: 200},
    {field: "cidade", headerName: "Cidade", width: 150},
    {field: "estado", headerName: "Estado", width: 100},
    {field: "responsavel_nome", headerName: "Nome do Responsável", width: 200},
    {
      field: "responsavel_celular",
      headerName: "Celular do Responsável",
      width: 180,
    },
    {
      field: "responsavel_email",
      headerName: "Email do Responsável",
      width: 200,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-zinc-200">
      <HeaderH1 onClick={() => router.back()} title="Consultar Aluno" />
      <div style={{height: "100%", width: "100%"}}>
        <DataGrid
          rows={rows}
          columns={columns}
          density={"compact"}
          disableColumnMenu
          loading={loading} // Exibe o indicador de carregamento
        />
      </div>
    </div>
  );
};

export default ConsultarAluno;
