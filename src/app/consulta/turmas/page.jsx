"use client";
import {useEffect, useState} from "react";
import BaseTableSearch from "@/components/BaseTableSearch";
import useRequest from "@/hooks/useRequest";
import {notifyError, notifySuccess} from "@/components/Notify";
import ModalEdit from "@/components/ModalEdit";
import {Input} from "@/components/Input";

const ConsultarTurmas = () => {
  const {get, error, loading} = useRequest();
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [itemId, setItemId] = useState("");
  const [reload, setReload] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

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

  const handleEditOpen = async (id) => {
    try {
      setEditLoading(true);
      const response = await get(`api/turmas/${id}`);
      if (response.data) {
        setEditFormData({
          nome: response.data.nome || "",
          ano: response.data.ano || "",
        });
        setOpenEditModal(true);
      }
    } catch {
      notifyError("Erro ao carregar dados da turma para edição.");
    } finally {
      setEditLoading(false);
    }
  };
  const handleEditSave = async (e) => {
    e.preventDefault();
    if (!editFormData || !itemId) return;
    try {
      setEditLoading(true);
      const response = await get().patch(
        `api/turmas/${itemId}`,
        JSON.stringify(editFormData)
      );
      if (response.data) {
        notifySuccess("Turma atualizada com sucesso!");
        setOpenDialog(false);
        setReload(true);
      } else {
        notifyError("Erro ao atualizar turma.");
      }
    } catch {
      notifyError("Erro ao atualizar turma.");
    } finally {
      setEditLoading(false);
    }
  };
  const handleEditChange = (e) => {
    const {name, value} = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onRowDoubleClick = (row) => {
    if (row.id) {
      setItemId(row.id);
      setOpenDialog(true);
    }
  };

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
        url={`api/turmas/${itemId}`}
        errorMsg="Você não possui permissões para excluir turmas."
        onEdit={handleEditOpen}
      />
      <ModalEdit
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onSave={handleEditSave}
        loading={editLoading}
        isEdit={true}
        title="Editar Turma"
        form={
          editFormData && (
            <form onSubmit={handleEditSave}>
              <div className="flex flex-col gap-4 p-4">
                <Input
                  label="Nome"
                  type="text"
                  name="nome"
                  value={editFormData.nome}
                  onChange={handleEditChange}
                />
                <Input
                  label="Ano"
                  type="number"
                  name="ano"
                  value={editFormData.ano}
                  onChange={handleEditChange}
                />
              </div>
            </form>
          )
        }
      />
    </>
  );
};

export default ConsultarTurmas;
