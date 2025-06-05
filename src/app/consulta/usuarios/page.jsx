"use client";
import BaseTableSearch from "@/components/BaseTableSearch";
import useRequest from "@/hooks/useRequest";
import convertToBrazilianDate from "@/utils/convertToBrazilianDate";
import {useEffect, useState} from "react";
import AlertDialog from "@/components/AlertDialog";
import {notifyError} from "@/components/Notify";

const ConsultarUsuario = () => {
  const {get, error, loading} = useRequest();
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [itemId, setItemId] = useState("");
  const [reload, setReload] = useState(false);

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
  const onRowDoubleClick = (row) => {
    console.log(row.row.cargo);

    if (row.id) {
      setItemId(row.id);

      if (row?.row?.cargo === "Desenvolvedor" || row?.row?.cargo === "Diretor")
        setOpenDialog(true);
    }
  };

  return (
    <>
      <BaseTableSearch
        columns={columns}
        title="Consulta de Usuários"
        rows={rows}
        setRows={setRows}
        loading={loading}
        onRowDoubleClick={(row) => onRowDoubleClick(row)}
      />
      <AlertDialog
        state={openDialog}
        setState={setOpenDialog}
        itemId={itemId}
        setReload={setReload}
      />
    </>
  );
};

export default ConsultarUsuario;
