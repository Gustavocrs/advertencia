"use client";
import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import useRequest from "@/hooks/useRequest";
import {CircularProgress} from "@mui/material";
import convertToBrazilianDate from "@/utils/convertToBrazilianDate";
import withAuth from "@/components/withAuth";

const ImprimirAdvertencia = () => {
  const params = useParams();
  const router = useRouter();
  const [advertencia, setAdvertencia] = useState();
  const {get, loading} = useRequest();

  useEffect(() => {
    const fetchAdvertencia = async () => {
      try {
        const response = await get(`api/advertencias/${params.id}`);
        if (!response.data) {
          setAdvertencia(null);
          console.log("Erro ao buscar advertência");
        } else {
          setAdvertencia(response.data);
        }
      } catch (error) {
        setAdvertencia(null);
        console.log("Erro ao buscar advertência:", error);
      }
    };

    fetchAdvertencia();
  }, [params]);

  return (
    <>
      {loading ? (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
          <CircularProgress />
          <p className="text-slate-900 text-center font-xl mb-4">
            Carregando Advertência...
          </p>
        </div>
      ) : (
        <div className="p-8 bg-white text-black max-w-3xl mx-auto print:p-0 print:m-0 print:max-w-full">
          {/* LOGO */}
          <div className="flex justify-between items-center mb-6">
            {/* 🔲 INSERIR IMAGEM DO LOGO AQUI */}
            {/* <img src="/logo_escola.png" alt="Logo da escola" className="h-20" /> */}
            <div className="text-center flex-1">
              <h1 className="text-xl font-bold uppercase">
                Prefeitura da Cidade do Rio de Janeiro Secretaria Municipal de
                Educação 5ª Coordenadoria Regional de Educação Escola Municipal
                05.14.029 Malba Tahan
              </h1>
              <p className="text-sm">
                Av. Brasil, 17.221 – Irajá – Rio de Janeiro/RJ – Tel.: 3373-2003
              </p>
              <p className="text-sm">E-mail: emtahan@rioeduca.net</p>
            </div>
            <div style={{width: "80px"}}></div>
          </div>

          <hr className="border border-black my-4" />

          <h2 className="text-center text-2xl font-bold underline mb-6">
            TERMO DE ADVERTÊNCIA
          </h2>

          <p className="mb-4 text-justify leading-7">
            Aos <strong>{convertToBrazilianDate(advertencia?.data)}</strong>,
            o(a) aluno(a){" "}
            <strong>{advertencia?.aluno?.nome || "NOME DO ALUNO"}</strong>,
            turma <strong>{advertencia?.turma?.nome || "___"}</strong>, foi
            advertido(a) pelo servidor{" "}
            <strong>{advertencia?.usuario?.nome || "NOME DO SERVIDOR"}</strong>,
            pelos seguintes motivos:
          </p>

          <div className="border border-black p-4 mb-4 min-h-[80px]">
            {advertencia?.motivo || "Descrição da ocorrência não informada."}
          </div>
          <div className="border border-black p-4 mb-4 min-h-[80px]">
            <p className="font-semibold mb-2">Ação Esperada do Responsável</p>
            {advertencia?.acaoEsperada ||
              "Descrição da ocorrência não informada."}
            {advertencia?.dataComparecimento && (
              <p>
                Comparecer a unidade escolar em{" "}
                {new Date(advertencia?.dataComparecimento).toLocaleDateString(
                  "pt-BR"
                )}
                .
              </p>
            )}
          </div>

          <p className="mb-6 text-justify leading-7">
            O aluno declara estar ciente da advertência e compromete-se a não
            repetir o comportamento.
          </p>

          <div className="flex justify-between mt-12">
            <div className="text-center">
              <div className="border-t border-black w-48 mx-auto"></div>
              {/* 🔲 INSERIR ESPAÇO PARA ASSINATURA DO ALUNO */}
              <p className="mt-2">Assinatura do(a) Responsável</p>
            </div>
            <div className="text-center">
              <div className="border-t border-black w-48 mx-auto"></div>
              {/* 🔲 INSERIR ESPAÇO PARA ASSINATURA DO SERVIDOR */}
              <p className="mt-2">Assinatura do(a) Servidor(a)</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            {/* Local e data formatados para assinatura */}
            <p className="italic">
              Rio de Janeiro, {convertToBrazilianDate(advertencia?.data)}
            </p>
          </div>

          <div className="border border-black p-4 mt-8 mb-4 min-h-[80px]">
            <p className="font-semibold mb-2">
              Canhoto do Termo de Advertência
            </p>
            <div className="flex justify-between">
              <div>Aluno: {advertencia?.aluno?.nome || "NOME DO ALUNO"}</div>
              <div>Turma: {advertencia?.turma?.nome || "___"}</div>
              <div>
                Data:
                {convertToBrazilianDate(advertencia?.data)}
              </div>
            </div>
            <div>
              Motivo:{" "}
              {advertencia?.motivo || "Descrição da ocorrência não informada."}
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4 print:hidden">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Imprimir
            </button>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Voltar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default withAuth(ImprimirAdvertencia);
