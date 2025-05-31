"use client";
import {DataGrid} from "@mui/x-data-grid";
import {useEffect} from "react";
import {SideBar} from "@/components/SideBar";
import {NavBar} from "@/components/NavBar";
import {FaUserCircle} from "react-icons/fa";

const BaseTableSearch = ({
  columns,
  title,
  rows,
  setRows,
  loading,
  setLoading,
}) => {
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
          data_nascimento: usuario.data_nascimento
            ? new Date(usuario.data_nascimento).toLocaleDateString("pt-BR") // Converte a data para o formato pt-BR
            : "Data não informada",
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

        setRows && setRows(formattedData);
      } catch (error) {
        console.error("Erro ao buscar usuario:", error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };
    fetchUsuarios();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-zinc-200 w-full">
      <SideBar />
      <NavBar />
      <div className="md:ml-16 mt-14 ">
        <div className="flex justify-start items-center ml-2">
          <FaUserCircle className="text-4xl" />
          <h1 className="text-3xl p-4 font-bold uppercase text-slate-800 ">
            {title}
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <div style={{height: "100%", width: "95%"}}>
            <DataGrid
              rows={rows}
              columns={columns}
              density={"compact"}
              disableColumnMenu
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseTableSearch;
