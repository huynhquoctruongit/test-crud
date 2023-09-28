import axios from "axios";

export const AxiosClient = axios.create({
  baseURL: import.meta.env.VITE_API,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosClient.interceptors.response.use(function (response: any) {
  return response;
});

AxiosClient.interceptors.request.use(function (config: any) {
  return config;
});

export const fetcherClient = (url: any, params: any) => {
  if (url) {
    return AxiosClient.get(url, { params });
  }
};
export const optionsFetch = {
  fetcher: fetcherClient,
};
export default AxiosClient;
