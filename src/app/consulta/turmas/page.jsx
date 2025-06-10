"use client";
import {useEffect, useState} from "react";
import BaseTableSearch from "@/components/BaseTableSearch";
import useRequest from "@/hooks/useRequest";
import {notifyError, notifySuccess} from "@/components/Notify";

const ConsultarTurmas = () => {
  const {get, error, loading} = useRequest();
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [itemId, setItemId] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await get("api/turmas");
        if (response.data) {
          const formattedData = response.data.data.map((aluno, index) => ({
            id: aluno._id || index,
            nome: aluno.nome || "",
            ano: aluno.ano || "",
            alunos: Array.isArray(aluno.alunos) ? aluno.alunos : "Sem Alunos",
          }));
          setRows(formattedData);
        }
      } catch {
        notifyError(`${error?.message}`);
        console.log("Error: ", error);
      } finally {
        setReload(false);
      }
    };
    fetchTurmas();
  }, [reload]);

  const columns = [
    {field: "nome", headerName: "Turma", width: 200},
    {field: "ano", headerName: "Ano", width: 200},
    {
      field: "alunos",
      headerName: "Alunos",
      width: 150,
      renderCell: (params) => {
        return params.row.alunos.length;
      },
    },
  ];

  const onRowDoubleClick = (row) => {
    if (row.id) {
      setItemId(row.id);
      setOpenDialog(true);
    }
  };

  return (
    <>
      <BaseTableSearch
        columns={columns}
        title="Consulta de Turmas"
        rows={rows}
        setRows={setRows}
        loading={loading}
        onRowDoubleClick={(row) => onRowDoubleClick(row)}
        state={openDialog}
        setState={setOpenDialog}
        itemId={itemId}
        setReload={setReload}
      />
    </>
  );
};

export default ConsultarTurmas;
