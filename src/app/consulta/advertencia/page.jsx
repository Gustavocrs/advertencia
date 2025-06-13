"use client";
import {useEffect, useState} from "react";
import {Switch} from "@/components/Switch";
import BaseTableSearch from "@/components/BaseTableSearch";
import useRequest from "@/hooks/useRequest";
import convertToBrazilianDate from "@/utils/convertToBrazilianDate";
import withAuth from "@/components/withAuth";

const ConsultarAdvertencia = () => {
  const {get, patch, loading, error} = useRequest();
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
            ? convertToBrazilianDate(advertencia.data)
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

          try {
            const data = JSON.stringify({situacao: newValue});
            const response = await patch(`api/advertencias/${params.id}`, data);

            if (!response.data) {
              throw new Error("Erro ao atualizar situação");
            }

            setRows((prevRows) =>
              prevRows.map((row) =>
                row.id === params.id ? {...row, situacao: newValue} : row
              )
            );
          } catch {
            console.log("Erro ao atualizar situação:", error);
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

  return (
    <BaseTableSearch
      columns={columns}
      title="Consulta de Advertências"
      rows={rows}
      setRows={setRows}
      loading={loading}
      onRowDoubleClick={(row) => onRowDoubleClick(row)}
      // onRowClick={(row) => onRowClick(row)}
      state={openDialog}
      setState={setOpenDialog}
      itemId={itemId}
      setReload={setReload}
      isPrint={true}
      url={`api/advertencias/${itemId}`}
      errorMsg="Você não possui permissões para excluir uma Advertência"
    />
  );
};

export default withAuth(ConsultarAdvertencia);
