"use client";
import {useEffect, useState} from "react";
import {Switch} from "@/components/Switch";
import BaseTableSearch from "@/components/BaseTableSearch";
import useRequest from "@/hooks/useRequest";

const ConsultarAdvertencia = () => {
  const {get, loading} = useRequest();
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [itemId, setItemId] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchAdvertencias = async () => {
      try {
        const response = await get(`api/advertencias`);
        const formattedData = response.data.data.map((advertencia, index) => ({
          id: advertencia._id || index,
          name: advertencia.aluno?.nome || "Aluno não informado",
          turma: advertencia.turma?.nome || "Turma não informada",
          motivo: advertencia.motivo || "Motivo não informado",
          usuario: advertencia.usuario?.nome || "Usuario não informado",
          data: advertencia.data
            ? new Date(advertencia.data).toLocaleDateString("pt-BR")
            : "Data não informada",
          situacao: advertencia.situacao === true ? "true" : "false",
        }));

        setRows(formattedData);
      } catch (error) {
        notifyError(`${error?.message}`);
        console.log("Error: ", error);
      } finally {
        setReload(false);
      }
    };
    fetchAdvertencias();
  }, [reload]);

  const columns = [
    {field: "name", headerName: "Aluno", width: 200},
    {field: "turma", headerName: "Turma", width: 100},
    {field: "motivo", headerName: "Motivo", width: 300},
    {field: "usuario", headerName: "Servidor", width: 250},
    {field: "data", headerName: "Data", width: 100},
    {
      field: "situacao",
      headerName: "Situação",
      width: 150,
      renderCell: (params) => {
        const handleToggle = async () => {
          const newValue =
            params.value === "true" || params.value === true ? "false" : "true";
          const token = localStorage.getItem("token");

          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/advertencias/${params.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({situacao: newValue}),
              }
            );

            if (!response.ok) {
              throw new Error("Erro ao atualizar situação");
            }

            // Atualiza o valor localmente após sucesso
            setRows((prevRows) =>
              prevRows.map((row) =>
                row.id === params.id ? {...row, situacao: newValue} : row
              )
            );
          } catch (error) {
            console.error("Erro ao atualizar situação:", error);
          }
        };
        return (
          <div className="flex justify-center items-center h-full">
            <Switch params={params} onChange={handleToggle} />
          </div>
        );
      },
    },
  ];
  const onRowDoubleClick = (row) => {
    if (row.id) {
      setItemId(row.id);
      setOpenDialog(true);
    }
  };
  const onRowClick = (row) => {
    console.log(row);
  };

  return (
    <BaseTableSearch
      columns={columns}
      title="Consulta de Advertências"
      rows={rows}
      setRows={setRows}
      loading={loading}
      onRowDoubleClick={(row) => onRowDoubleClick(row)}
      onRowClick={(row) => onRowClick(row)}
      state={openDialog}
      setState={setOpenDialog}
      itemId={itemId}
      setReload={setReload}
      isPrint={true}
      url={`api/advertencias/${itemId}`}
    />
  );
};

export default ConsultarAdvertencia;
