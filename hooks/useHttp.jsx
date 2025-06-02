import {useContext, useEffect} from "react";
import KeycloakContext from "../contexts/KeycloakContext";
import {useTimestamp} from "./useTimestamp";

/**
 * @description searchParams: Para que os parâmetros sejam passados pelo hook - Parâmetros: (domain = null, busca, page, start, stop, sort, dir)
 * @description defaultParams: Quando não precisar enviar parâmetros
 * @description dataParams: Quando precisar enviar argumentos no header
 */

export const useHttp = (
  domain = null,
  busca,
  page,
  start,
  stop,
  sort,
  dir,
  fields
) => {
  const {tokenKeycloak} = useContext(KeycloakContext);
  const d = domain;
  let timestamp = new Date();
  timestamp = useTimestamp(timestamp);

  // useEffect(() => {
  //   console.log("useHttp - DOMAIN:", domain);
  //   console.table([busca, page, start, stop, sort, dir, fields]);
  // }, [domain, busca, page, start, stop, sort, dir, fields]);

  const verificaValor = (domainValue, paramValue) => {
    if (paramValue !== undefined && paramValue !== null && paramValue !== "") {
      return paramValue;
    }
    if (
      domainValue !== undefined &&
      domainValue !== null &&
      domainValue !== ""
    ) {
      return domainValue;
    }
    return "";
  };

  const config = {
    dc: `?_dc=${timestamp}`,
    searchParams: {
      params: {
        _dc: timestamp,
        query: busca,
        fields: verificaValor(d !== null ? d.fields : "", fields),
        page: verificaValor(d !== null ? d.page : "", page),
        start: verificaValor(d !== null ? d.startPage : "", start),
        limit: verificaValor(d !== null ? d.totalPage : "", stop),
        sort: verificaValor(d !== null ? d.sort : "", sort),
        dir: verificaValor(d !== null ? d.dir : "", dir),
      },
      headers: {Authorization: `Bearer ${tokenKeycloak}`},
    },

    defaultParams: {
      params: {_dc: timestamp},
      headers: {Authorization: `Bearer ${tokenKeycloak}`},
    },

    dataParams: {
      headers: {Authorization: `Bearer ${tokenKeycloak}`},
      data: [],
    },
  };

  return config;
};
