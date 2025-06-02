import {useState, useCallback} from "react";
import axios from "axios";
import {useTimestamp} from "./useTimestamp";

/**
 * Hook unificado para requisições HTTP com configuração dinâmica, autenticação e estados de loading/error.
 * Parâmetros: busca, page, start, stop, sort, dir, fields
 */
export default function useRequest(
  busca = "",
  page = "",
  start = "",
  stop = "",
  sort = "",
  dir = "",
  fields = ""
) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    searchParams: {
      params: {
        query: busca,
        fields: verificaValor(fields),
        page: verificaValor(page),
        start: verificaValor(start),
        limit: verificaValor(stop),
        sort: verificaValor(sort),
        dir: verificaValor(dir),
      },
      headers: {Authorization: `Bearer ${token}`},
    },
    defaultParams: {
      headers: {Authorization: `Bearer ${token}`},
    },
    dataParams: {
      headers: {Authorization: `Bearer ${token}`},
      data: [],
    },
  };

  const get = useCallback(
    async (url, customConfig = config.defaultParams) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(url, customConfig);
        return {
          data: response.data,
          total: response.data.total,
          headers: response.headers,
          config: response.config,
          status: response.status,
        };
      } catch (error) {
        setError(error?.response?.data);
        throw error?.response?.data;
      } finally {
        setLoading(false);
      }
    },
    [timestamp, token, busca, page, start, stop, sort, dir, fields]
  );

  const post = useCallback(
    async (url, data = null, customConfig = config.dataParams) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(url, data, customConfig);
        return {data: response.data};
      } catch (error) {
        setError(error?.response?.data);
        throw error?.response?.data;
      } finally {
        setLoading(false);
      }
    },
    [timestamp, token]
  );

  const put = useCallback(
    async (url, data = null, customConfig = config.dataParams) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.put(url, data, customConfig);
        return {data: response.data};
      } catch (error) {
        setError(error?.response?.data);
        throw error?.response?.data;
      } finally {
        setLoading(false);
      }
    },
    [timestamp, token]
  );

  const del = useCallback(
    async (url, data = null, customConfig = config.dataParams) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.delete(url, {...customConfig, data});
        return {data: response.data};
      } catch (error) {
        setError(error?.response?.data);
        throw error?.response?.data;
      } finally {
        setLoading(false);
      }
    },
    [timestamp, token]
  );

  return {get, post, put, del, loading, error, config};
}
