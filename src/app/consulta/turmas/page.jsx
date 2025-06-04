"use client";
import {useEffect, useState} from "react";
import BaseTableSearch from "@/components/BaseTableSearch";
import useRequest from "@/hooks/useRequest";
import {notifyError, notifySuccess} from "@/components/Notify";

const ConsultarTurmas = () => {
  const {get, error, loading} = useRequest();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await get("api/turmas");
        if (response.data) {
          notifySuccess(response.data.message);
          const formattedData = response.data.data.map((aluno, index) => ({
            id: aluno._id || index,
            nome: aluno.nome || "",
            ano: aluno.ano || "",
          }));

          setRows(formattedData);
        }
      } catch {
        notifyError(`${error?.message}`);
        console.log("Error: ", error);
      }
    };
    fetchTurmas();
  }, []);

  const columns = [
    {field: "nome", headerName: "Turma", width: 200},
    {field: "ano", headerName: "Ano", width: 200},
  ];

  const onRowDoubleClick = (row) => {
    console.log("row", row.id);
  };

  return (
    <BaseTableSearch
      columns={columns}
      title="Consulta de Turmas"
      rows={rows}
      setRows={setRows}
      loading={loading}
      onRowDoubleClick={(row) => onRowDoubleClick(row)}
    />
  );
};

export default ConsultarTurmas;
