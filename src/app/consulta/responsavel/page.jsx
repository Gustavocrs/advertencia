"use client";
import {HeaderH1} from "@/components/HeaderH1";
import {useRouter} from "next/navigation";
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";

const ConsultarResponsavel = () => {
  const router = useRouter();
  const [rows, setRows] = useState([]); // Estado para armazenar os dados
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento

  useEffect(() => {
    const fetchResponsavel = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/responsaveis`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar responsáveis");
        }
        const data = await response.json();

        // Formata os dados para o DataGrid
        const formattedData = data.data.map((responsavel, index) => ({
          id: responsavel._id || index, // Usa o _id como ID ou o índice como fallback
          nome: responsavel.nome || "",
          cpf: responsavel.cpf || "",
          celular: responsavel.celular || "",
          email: responsavel.email || "",
          endereco: responsavel.endereco || "",
          cidade: responsavel.cidade || "",
          estado: responsavel.estado || "",
        }));

        setRows(formattedData);
      } catch (error) {
        console.error("Erro ao buscar responsáveis:", error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };
    fetchResponsavel();
  }, []);

  const columns = [
    {field: "nome", headerName: "Nome do Responsável", width: 200},
    {field: "cpf", headerName: "CPF", width: 150},
    {field: "celular", headerName: "Celular", width: 150},
    {field: "email", headerName: "Email", width: 200},
    {field: "endereco", headerName: "Endereço", width: 200},
    {field: "cidade", headerName: "Cidade", width: 150},
    {field: "estado", headerName: "Estado", width: 100},
  ];

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-zinc-200">
      <HeaderH1 onClick={() => router.back()} title="Consultar Responsável" />
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

export default ConsultarResponsavel;
