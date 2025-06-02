import axios from "axios";

export const get = (url, config = null) => {
  return axios
    .get(url, config)
    .then((response) => {
      return {
        data: response.data.data ? response.data.data : response.data,
        total: response.data.total,
        headers: response.headers,
        config: response.config,
        status: response.status,
      };
    })
    .catch((error) => {
      throw error?.response?.data;
    });
};

export const post = (url, data = null, config = null) => {
  return axios
    .post(url, data, config)
    .then((response) => {
      return {
        data: response.data.data ? response.data.data : response.data,
      };
    })
    .catch((error) => {
      throw error?.response?.data;
    });
};

export const put = (url, data = null, config = null) => {
  return axios
    .put(url, data, config)
    .then((response) => {
      return {
        data: response.data.data ? response.data.data : response.data,
      };
    })
    .catch((error) => {
      throw error?.response?.data;
    });
};

export const del = (url, data = null, config = null) => {
  // console.log(data);
  // console.log(config);
  return axios
    .delete(url, data, config)
    .then((response) => {
      return {
        data: response.data.data ? response.data.data : response.data,
      };
    })
    .catch((error) => {
      throw error?.response?.data;
    });
};
