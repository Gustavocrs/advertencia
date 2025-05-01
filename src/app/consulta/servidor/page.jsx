"use client";
import {HeaderH1} from "@/components/HeaderH1";
import {useRouter} from "next/navigation";
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";

const ConsultarServidor = () => {
  const router = useRouter();
  const [rows, setRows] = useState([]); // Estado para armazenar as advertências
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento

  useEffect(() => {
    const fetchServidor = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/servidores");
        if (!response.ok) {
          throw new Error("Erro ao buscar servidores");
        }
        const data = await response.json();

        // Formata os dados para o DataGrid
        const formattedData = data.data.map((servidor, index) => ({
          id: servidor._id || index, // Usa o _id como ID ou o índice como fallback
          nome: servidor.nome || "",
          cpf: servidor.cpf || "",
          cep: servidor.cep || "",
          data_nascimento: servidor.data_nascimento
            ? new Date(servidor.data_nascimento).toLocaleDateString("pt-BR") // Converte a data para o formato pt-BR
            : "Data não informada",
          endereco: servidor.endereco || "",
          numero: servidor.numero || "",
          complemento: servidor.complemento || "",
          bairro: servidor.bairro || "",
          cidade: servidor.cidade || "",
          estado: servidor.estado || "",
          celular: servidor.celular || "",
          email: servidor.email || "",
          disciplina: servidor.disciplina || "",
          matricula: servidor.matricula || "",
          cargo: servidor.cargo || "",
        }));

        setRows(formattedData);
      } catch (error) {
        console.error("Erro ao buscar servidores:", error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };
    fetchServidor();
  }, []);

  const columns = [
    {field: "nome", headerName: "Nome", width: 200},
    {field: "cpf", headerName: "CPF", width: 150},
    {field: "cep", headerName: "CEP", width: 120},
    {field: "data_nascimento", headerName: "Data de Nascimento", width: 180},
    {field: "endereco", headerName: "Endereço", width: 200},
    {field: "numero", headerName: "Número", width: 100},
    {field: "complemento", headerName: "Complemento", width: 150},
    {field: "bairro", headerName: "Bairro", width: 150},
    {field: "cidade", headerName: "Cidade", width: 150},
    {field: "estado", headerName: "Estado", width: 100},
    {field: "celular", headerName: "Celular", width: 150},
    {field: "email", headerName: "Email", width: 200},
    {field: "disciplina", headerName: "Disciplina", width: 150},
    {field: "matricula", headerName: "Matrícula", width: 150},
    {field: "cargo", headerName: "Cargo", width: 150},
  ];

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-zinc-200">
      <HeaderH1 onClick={() => router.back()} title="Consultar Servidor" />
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

export default ConsultarServidor;
