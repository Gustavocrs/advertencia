"use client";
import {useEffect, useState} from "react";
import BaseTableSearch from "@/components/BaseTableSearch";
import useRequest from "@/hooks/useRequest";
import ModalEdit from "@/components/ModalEdit";
import BaseFormCadastro from "@/components/BaseFormCadastro";
import {notifyError, notifySuccess} from "@/components/Notify";
import {Input} from "@/components/Input";
import withAuth from "@/components/withAuth";

const ConsultarAluno = () => {
  const {get, patch, loading} = useRequest();
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [itemId, setItemId] = useState("");
  const [reload, setReload] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await get("api/turmas");
        const turmasFormatadas = response.data.data.map((turma) => ({
          value: turma._id,
          label: turma.nome,
        }));
        setTurmas(turmasFormatadas);
      } catch {
        notifyError(`${error?.message}`);
        console.log("Error: ", error);
      }
    };
    fetchTurmas();
  }, []);
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
      } catch (error) {
        notifyError(`${error?.message}`);
        console.log("Error: ", error);
      } finally {
        setReload(false);
      }
    };
    fetchAlunos();
  }, [reload]);

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

  const emptyAluno = {
    nome: "",
    data_nascimento: "",
    cpf: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    celular: "",
    email: "",
    turma: "",
    matricula: "",
    responsavel: {
      nome: "",
      celular1: "",
      celular2: "",
      email: "",
    },
  };

  const handleEditOpen = async (id) => {
    try {
      setEditLoading(true);
      const response = await get(`api/alunos/${id}`);
      if (response.data) {
        setEditFormData({
          ...emptyAluno,
          ...response.data,
          data_nascimento: response.data.data_nascimento
            ? response.data.data_nascimento.split("T")[0]
            : "",
          responsavel: {
            ...emptyAluno.responsavel,
            ...(response.data.responsavel || {}),
          },
        });
        setOpenEditModal(true); // <-- aqui!
      }
    } catch {
      notifyError("Erro ao carregar dados do aluno para edição.");
    } finally {
      setEditLoading(false);
    }
  };
  const handleEditSave = async (e) => {
    e.preventDefault();
    if (!editFormData || !itemId) return;
    try {
      setEditLoading(true);
      const response = await patch(
        `api/alunos/${itemId}`,
        JSON.stringify(editFormData)
      );
      if (response.data) {
        notifySuccess("Aluno atualizado com sucesso!");
        setOpenDialog(false);
        setReload(true);
      } else {
        notifyError("Erro ao atualizar aluno.");
      }
    } catch {
      notifyError("Erro ao atualizar aluno.");
    } finally {
      setEditLoading(false);
    }
  };
  const onRowDoubleClick = (row) => {
    if (row.id) {
      setItemId(row.id);
      setOpenDialog(true);
    }
  };
  const handleEditChange = (e) => {
    const {name, value} = e.target;
    if (name.startsWith("responsavel.")) {
      const field = name.split(".")[1];
      setEditFormData((prev) => ({
        ...prev,
        responsavel: {
          ...prev.responsavel,
          [field]: value,
        },
      }));
    } else {
      setEditFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  return (
    <>
      <BaseTableSearch
        columns={columns}
        title="Consulta de Aluno"
        rows={rows}
        setRows={setRows}
        loading={loading}
        onRowDoubleClick={(row) => onRowDoubleClick(row)}
        state={openDialog}
        setState={setOpenDialog}
        itemId={itemId}
        setReload={setReload}
        url={`api/alunos/${itemId}`}
        errorMsg="Você não possui permissões para excluir alunos."
        onEdit={handleEditOpen}
      />
      <ModalEdit
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onSave={handleEditSave}
        loading={editLoading}
        isEdit={true}
        title="Editar Aluno"
        form={
          editFormData && (
            <form onSubmit={handleEditSave}>
              <BaseFormCadastro
                otherFields={
                  <>
                    <Input
                      label="E-mail"
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditChange}
                    />
                    <Input
                      label="Turma"
                      type="select"
                      name="turma"
                      value={editFormData.turma}
                      onChange={handleEditChange}
                      data={turmas}
                    />
                    <Input
                      label="Matrícula"
                      type="text"
                      name="matricula"
                      value={editFormData.matricula}
                      onChange={handleEditChange}
                    />
                    <div className="mt-4 mb-2 font-bold uppercase text-slate-900 text-xl">
                      Dados do Responsável
                    </div>
                    <Input
                      label="Nome"
                      type="text"
                      name="responsavel.nome"
                      value={editFormData.responsavel?.nome || ""}
                      onChange={handleEditChange}
                    />
                    <Input
                      label="Celular 1 (Whatsapp)"
                      type="cel"
                      name="responsavel.celular1"
                      value={editFormData.responsavel?.celular1 || ""}
                      onChange={handleEditChange}
                    />
                    <Input
                      label="Celular 2"
                      type="cel"
                      name="responsavel.celular2"
                      value={editFormData.responsavel?.celular2 || ""}
                      onChange={handleEditChange}
                    />
                    <Input
                      label="E-mail"
                      type="email"
                      name="responsavel.email"
                      value={editFormData.responsavel?.email || ""}
                      onChange={handleEditChange}
                    />
                  </>
                }
                formData={editFormData}
                setFormData={setEditFormData}
                onChange={handleEditChange}
              />
            </form>
          )
        }
      />
    </>
  );
};

export default withAuth(ConsultarAluno);
