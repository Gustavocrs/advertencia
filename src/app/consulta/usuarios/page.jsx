"use client";
import BaseTableSearch from "@/components/BaseTableSearch";
import convertToBrazilianDate from "@/utils/convertToBrazilianDate";
import {useEffect, useState} from "react";

const ConsultarUsuario = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/usuarios`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar usuario");
        }
        const data = await response.json();

        // Formata os dados para o DataGrid
        const formattedData = data.data.map((usuario, index) => ({
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
          password: usuario.password || "",
        }));

        setRows(formattedData);
      } catch (error) {
        console.error("Erro ao buscar usuario:", error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };
    fetchUsuarios();
  }, []);

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
    <BaseTableSearch
      columns={columns}
      title="Consulta de Usuários"
      rows={rows}
      setRows={setRows}
      loading={loading}
      setLoading={setLoading}
    />
  );
};

export default ConsultarUsuario;
