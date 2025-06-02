import {useState, useCallback} from "react";
import axios from "axios";

export default function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const get = useCallback(async (url, config = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(url, config);
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
  }, []);

  const post = useCallback(async (url, data = null, config = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(url, data, config);
      return {data: response.data};
    } catch (error) {
      setError(error?.response?.data);
      throw error?.response?.data;
    } finally {
      setLoading(false);
    }
  }, []);

  const put = useCallback(async (url, data = null, config = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(url, data, config);
      return {data: response.data};
    } catch (error) {
      setError(error?.response?.data);
      throw error?.response?.data;
    } finally {
      setLoading(false);
    }
  }, []);

  const del = useCallback(async (url, data = null, config = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(url, {...config, data});
      return {data: response.data};
    } catch (error) {
      setError(error?.response?.data);
      throw error?.response?.data;
    } finally {
      setLoading(false);
    }
  }, []);

  return {get, post, put, del, loading, error};
}
