import {useState, useCallback} from "react";
import axios from "axios";

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

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

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
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    defaultParams: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  };

  const get = useCallback(
    async (url, customConfig = config.defaultParams) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${baseUrl}/${url}`, customConfig);
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
    [token, busca, page, start, stop, sort, dir, fields]
  );
  const post = useCallback(
    async (url, data = "") => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          `${baseUrl}/${url}`,
          data,
          config.defaultParams
        );
        return {data: response.data};
      } catch (error) {
        setError(error?.response?.data);
        throw error?.response?.data;
      } finally {
        setLoading(false);
      }
    },
    [token, baseUrl]
  );
  const patch = useCallback(
    async (url, data = "") => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.patch(
          `${baseUrl}/${url}`,
          data,
          config.defaultParams
        );
        return {data: response.data};
      } catch (error) {
        setError(error?.response?.data);
        throw error?.response?.data;
      } finally {
        setLoading(false);
      }
    },
    [token, baseUrl]
  );
  const put = useCallback(
    async (url, data = "") => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.put(
          `${baseUrl}/${url}`,
          data,
          config.defaultParams
        );
        return {data: response.data};
      } catch (error) {
        setError(error?.response?.data);
        throw error?.response?.data;
      } finally {
        setLoading(false);
      }
    },
    [token, baseUrl]
  );
  const del = useCallback(
    async (url) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.delete(
          `${baseUrl}/${url}`,
          config.defaultParams
        );
        return {data: response.data};
      } catch (error) {
        setError(error?.response?.data);
        throw error?.response?.data;
      } finally {
        setLoading(false);
      }
    },
    [token, baseUrl]
  );
  return {get, post, patch, put, del, loading, error, config};
}
