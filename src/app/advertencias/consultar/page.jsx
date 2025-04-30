"use client";
import {HeaderH1} from "@/components/HeaderH1";
import {useRouter} from "next/navigation";
import {DataGrid} from "@mui/x-data-grid";

const ConsultarAdvertencia = () => {
  const router = useRouter();

  const rows = [
    {id: 1, name: "Fulano da Silva", turma: "602"},
    {id: 2, name: "Ciclano da Silva", turma: "801"},
    {id: 3, name: "Beltrano da Silva", turma: "701"},
  ];

  const columns = [
    {field: "name", headerName: "Aluno", width: 250},
    {field: "turma", headerName: "Turma", width: 150},
  ];

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-zinc-200">
      <HeaderH1 onClick={() => router.back()} title="Consultar Advertência" />
      <div style={{height: "100%", width: "100%"}}>
        <DataGrid
          rows={rows}
          columns={columns}
          density={"compact"}
          disableColumnMenu
        />
      </div>
    </div>
  );
};

export default ConsultarAdvertencia;
