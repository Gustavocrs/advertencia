"use client";
import {useEffect, useState} from "react";
import BaseTableSearch from "@/components/BaseTableSearch";
import useRequest from "@/hooks/useRequest";

const ConsultarAluno = () => {
  const {get, error, loading} = useRequest();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await get("api/alunos");
        const formattedData = response.data.data.map((aluno, index) => ({
          id: aluno._id || index,
          nome: aluno.nome || "",
          matricula: aluno.matricula || "",
          turma: aluno.turma?.nome || "",
          data_nascimento: aluno.data_nascimento
            ? new Date(aluno.data_nascimento).toLocaleDateString("pt-BR")
            : "Data não informada",
          cpf: aluno.cpf || "",
          cep: aluno.cep || "",
          endereco: aluno.endereco || "",
          numero: aluno.numero || "",
          complemento: aluno.complemento || "",
          bairro: aluno.bairro || "",
          cidade: aluno.cidade || "",
          estado: aluno.estado || "",
          celular: aluno.celular || "",
          responsavel_nome: aluno.responsavel?.nome || "",
          responsavel_celular1: aluno.responsavel?.celular1 || "",
          responsavel_celular2: aluno.responsavel?.celular2 || "",
          responsavel_email: aluno.responsavel?.email || "",
        }));

        setRows(formattedData);
      } catch {
        console.error(error);
      }
    };
    fetchAlunos();
  }, []);

  const columns = [
    {field: "nome", headerName: "Nome do Aluno", width: 200},
    {field: "matricula", headerName: "Matrícula", width: 150},
    {field: "turma", headerName: "Turma", width: 150},
    {field: "data_nascimento", headerName: "Data de Nascimento", width: 180},
    {field: "cpf", headerName: "CPF", width: 150},
    {field: "cep", headerName: "CEP", width: 120},
    {field: "endereco", headerName: "Endereço", width: 200},
    {field: "numero", headerName: "Número", width: 100},
    {field: "complemento", headerName: "Complemento", width: 120},
    {field: "bairro", headerName: "Bairro", width: 150},
    {field: "cidade", headerName: "Cidade", width: 150},
    {field: "estado", headerName: "Estado", width: 100},
    {field: "celular", headerName: "Celular do Aluno", width: 150},
    {field: "responsavel_nome", headerName: "Nome do Responsável", width: 200},
    {
      field: "responsavel_celular1",
      headerName: "Celular 1 do Responsável",
      width: 180,
    },
    {
      field: "responsavel_celular2",
      headerName: "Celular 2 do Responsável",
      width: 180,
    },
    {
      field: "responsavel_email",
      headerName: "Email do Responsável",
      width: 200,
    },
  ];

  const onRowDoubleClick = (row) => {
    console.log("row", row.id);
  };

  return (
    <BaseTableSearch
      columns={columns}
      title="Consulta de Aluno"
      rows={rows}
      setRows={setRows}
      loading={loading}
      onRowDoubleClick={(row) => onRowDoubleClick(row)}
    />
  );
};

export default ConsultarAluno;
