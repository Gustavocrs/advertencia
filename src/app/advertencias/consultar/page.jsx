"use client";
import {HeaderH1} from "@/components/HeaderH1";
import {useRouter} from "next/navigation";
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";

const ConsultarAdvertencia = () => {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvertencias = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/advertencias");
        if (!response.ok) {
          throw new Error("Erro ao buscar advertências");
        }
        const data = await response.json();

        const formattedData = data.data.map((advertencia, index) => ({
          id: advertencia._id || index,
          name: advertencia.aluno?.nome || "Aluno não informado",
          turma: advertencia.turma || "Turma não informada",
          servidor: advertencia.servidor?.nome || "Servidor não informado",
          data: advertencia.data
            ? new Date(advertencia.data).toLocaleDateString("pt-BR")
            : "Data não informada",
        }));

        setRows(formattedData);
      } catch (error) {
        console.error("Erro ao buscar advertências:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvertencias();
  }, []);

  const columns = [
    {field: "name", headerName: "Aluno", width: 200},
    {field: "turma", headerName: "Turma", width: 100},
    {field: "servidor", headerName: "Servidor", width: 250},
    {field: "data", headerName: "Data", width: 100},
  ];

  // Função para lidar com o clique na linha
  const handleRowClick = (params) => {
    router.push(`/advertencias/imprimir/${params.id}`);
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-zinc-200">
      <HeaderH1 onClick={() => router.back()} title="Consultar Advertência" />
      <div style={{height: "100%", width: "100%"}}>
        <DataGrid
          rows={rows}
          columns={columns}
          density={"compact"}
          disableColumnMenu
          loading={loading}
          onRowClick={handleRowClick} // Adiciona o evento de clique na linha
        />
      </div>
    </div>
  );
};

export default ConsultarAdvertencia;
