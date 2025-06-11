"use client";
import BaseTableSearch from "@/components/BaseTableSearch";
import useRequest from "@/hooks/useRequest";
import convertToBrazilianDate from "@/utils/convertToBrazilianDate";
import {useEffect, useState} from "react";
import {notifyError} from "@/components/Notify";
import Settings from "@mui/icons-material/Settings";
import ModalEdit from "@/components/ModalEdit";
import {Input} from "@/components/Input";
import {fetchEstados} from "@/utils/fetchEstados";
import {fetchMunicipios} from "@/utils/fetchMunicipios";
import {checkPermission} from "@/utils/checkPermission";

const ConsultarUsuario = () => {
  const {get, error, loading} = useRequest();
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [itemId, setItemId] = useState("");
  const [reload, setReload] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [dataEstados, setDataEstados] = useState([]);
  const [dataMunicipios, setDataMunicipios] = useState([]);
  const hasPermission = checkPermission();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await get(`api/usuarios`);
        if (response.data) {
          const formattedData = response.data.data.map((usuario, index) => ({
            id: usuario._id || index, // Usa o _id como ID ou o índice como fallback
            nome: usuario.nome || "",
            cpf: usuario.cpf || "",
            cep: usuario.cep || "",
            data_nascimento: convertToBrazilianDate(usuario.data_nascimento),
            endereco: usuario.endereco || "",
            numero: usuario.numero || "",
            complemento: usuario.complemento || "",
            bairro: usuario.bairro || "",
            cidade: usuario.cidade || "",
            estado: usuario.estado || "",
            celular: usuario.celular || "",
            email: usuario.email || "",
            disciplina: usuario.disciplina || "",
            matricula: usuario.matricula || "",
            cargo: usuario.cargo || "",
          }));

          setRows(formattedData);
        }
      } catch (error) {
        notifyError(`${error?.message}`);
        console.log("Error: ", error);
      } finally {
        setReload(false);
      }
    };
    fetchUsuarios();
  }, [reload]);

  useEffect(() => {
    fetchEstados(setDataEstados);
    if (editFormData && editFormData.estado) {
      fetchMunicipios(editFormData.estado, setDataMunicipios, setEditFormData);
    }
  }, [editFormData?.estado]);
  const onRowDoubleClick = (row) => {
    if (row.id) {
      setItemId(row.id);
      setOpenDialog(true);
    }
  };
  const handleEditOpen = async (id) => {
    if (hasPermission) {
      try {
        setEditLoading(true);
        const response = await get(`api/usuarios/${id}`);
        if (response.data) {
          setEditFormData({
            ...response.data,
            data_nascimento: response.data.data_nascimento
              ? response.data.data_nascimento.split("T")[0]
              : "",
            password: "",
          });
          setOpenEditModal(true);
        }
      } catch {
        notifyError("Erro ao carregar dados do usuário para edição.");
        console.log(error);
      } finally {
        setEditLoading(false);
      }
    } else {
      notifyError("Você não tem permissão para Editar Usuários");
    }
  };
  const handleEditSave = async (e) => {
    e.preventDefault();
    if (!editFormData || !itemId) return;
    try {
      setEditLoading(true);
      const response = await get().patch(
        `api/usuarios/${itemId}`,
        JSON.stringify(editFormData)
      );
      if (response.data) {
        notifySuccess("Usuário atualizado com sucesso!");
        setOpenEditModal(false);
        setReload(true);
      } else {
        notifyError("Erro ao atualizar usuário.");
      }
    } catch {
      notifyError("Erro ao atualizar usuário.");
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
  const columns = [
    {field: "nome", headerName: "Nome", width: 200},
    {field: "cpf", headerName: "CPF", width: 150},
    {field: "data_nascimento", headerName: "Data de Nascimento", width: 180},
    {field: "celular", headerName: "Celular", width: 150},
    {field: "email", headerName: "Email", width: 200},
    {field: "disciplina", headerName: "Disciplina", width: 150},
    {field: "matricula", headerName: "Matrícula", width: 150},
    {field: "cargo", headerName: "Cargo", width: 150},
  ];

  return (
    <>
      <BaseTableSearch
        columns={columns}
        title="Gerenciamento de Usuários"
        rows={rows}
        setRows={setRows}
        loading={loading}
        onRowDoubleClick={(row) => onRowDoubleClick(row)}
        state={openDialog}
        setState={setOpenDialog}
        itemId={itemId}
        setReload={setReload}
        icon={<Settings fontSize="large" className="text-slate-800 text-4xl" />}
        url={`api/usuarios/${itemId}`}
        errorMsg="Você não possui permissões para excluir usuários."
        onEdit={handleEditOpen}
      />
      <ModalEdit
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onSave={handleEditSave}
        loading={editLoading}
        isEdit={true}
        title="Editar Usuário"
        form={
          editFormData && (
            <form onSubmit={handleEditSave}>
              <div className="flex flex-col w-full h-full p-4 bg-white shadow-lg rounded-lg">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditChange}
                />
                <Input
                  label="Senha"
                  type="password"
                  name="password"
                  placeholder="********"
                  value={editFormData.password}
                  onChange={handleEditChange}
                />
                <Input
                  label="Nome"
                  type="text"
                  name="nome"
                  value={editFormData.nome}
                  onChange={handleEditChange}
                />
                <Input
                  label="CPF"
                  type="cpf"
                  name="cpf"
                  value={editFormData.cpf}
                  onChange={handleEditChange}
                />
                <Input
                  label="Data de Nascimento"
                  type="date"
                  name="data_nascimento"
                  value={editFormData.data_nascimento}
                  onChange={handleEditChange}
                />
                <Input
                  label="CEP"
                  type="text"
                  name="cep"
                  value={editFormData.cep}
                  onChange={handleEditChange}
                />
                <Input
                  label="Endereço"
                  type="text"
                  name="endereco"
                  value={editFormData.endereco}
                  onChange={handleEditChange}
                />
                <Input
                  label="N°"
                  type="number"
                  name="numero"
                  value={editFormData.numero}
                  onChange={handleEditChange}
                />
                <Input
                  label="Complemento"
                  type="text"
                  name="complemento"
                  value={editFormData.complemento}
                  onChange={handleEditChange}
                />
                <Input
                  label="Bairro"
                  type="text"
                  name="bairro"
                  value={editFormData.bairro}
                  onChange={handleEditChange}
                />
                <Input
                  label="Estado"
                  type="select"
                  name="estado"
                  value={editFormData.estado}
                  onChange={handleEditChange}
                  data={dataEstados}
                />
                <Input
                  label="Cidade"
                  type="select"
                  name="cidade"
                  value={editFormData.cidade}
                  onChange={handleEditChange}
                  data={dataMunicipios}
                />
                <Input
                  label="Celular"
                  type="cel"
                  name="celular"
                  value={editFormData.celular}
                  onChange={handleEditChange}
                />
                <Input
                  label="Disciplina"
                  type="text"
                  name="disciplina"
                  value={editFormData.disciplina}
                  onChange={handleEditChange}
                />
                <Input
                  label="Matricula"
                  type="text"
                  name="matricula"
                  value={editFormData.matricula}
                  onChange={handleEditChange}
                />
                <Input
                  label="Cargo"
                  type="text"
                  name="cargo"
                  value={editFormData.cargo}
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

export default ConsultarUsuario;
