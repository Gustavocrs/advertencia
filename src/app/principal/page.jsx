"use client";
import BasePage from "@/components/BasePage";
import {IoSearchSharp} from "react-icons/io5";
import {BsFileEarmarkBarGraphFill} from "react-icons/bs";
import {IoAddSharp} from "react-icons/io5";
import {Modulos} from "@/components/Modulos";

export default function Principal() {
  return (
    <BasePage title={"Módulos SGE"}>
      <Modulos
        title="Advertência"
        titleIcon={<BsFileEarmarkBarGraphFill />}
        texto1="Consultar"
        icon1={<IoSearchSharp />}
        route1={"consulta/advertencia"}
        texto2="Criar"
        icon2={<IoAddSharp />}
        route2={"/cadastro/advertencia"}
      />

      <Modulos
        title="Busca Ativa"
        texto1="Consultar"
        icon1={<IoSearchSharp />}
        route1={"consulta/advertencia"}
        texto2="Criar"
        icon2={<IoAddSharp />}
        route2={"/cadastro/advertencia"}
        disabled={true}
      />

      <Modulos
        title="Acordo de Infrequência"
        texto1="Consultar"
        icon1={<IoSearchSharp />}
        route1={"consulta/advertencia"}
        texto2="Criar"
        icon2={<IoAddSharp />}
        route2={"/cadastro/advertencia"}
        disabled={true}
      />
      <Modulos
        title="PEI"
        texto1="Consultar"
        icon1={<IoSearchSharp />}
        route1={"consulta/advertencia"}
        texto2="Criar"
        icon2={<IoAddSharp />}
        route2={"/cadastro/advertencia"}
        disabled={true}
      />
      <Modulos
        title="PPI"
        texto1="Consultar"
        icon1={<IoSearchSharp />}
        route1={"consulta/advertencia"}
        texto2="Criar"
        icon2={<BsFileEarmarkBarGraphFill />}
        route2={"/cadastro/advertencia"}
        disabled={true}
      />
    </BasePage>
  );
}
