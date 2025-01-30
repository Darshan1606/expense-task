import axios from "axios";
import {
  PERSIST_STORE_NAME,
  BACKEND_SERVER_URL,
} from "../constants/app.constant";

const api = axios.create({
  baseURL: `${BACKEND_SERVER_URL}`,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  async function (config) {
    const user = localStorage.getItem(PERSIST_STORE_NAME);
    const authData = JSON.parse(user)?.auth;
    const token = JSON.parse(authData)?.session?.token;
    console.log("token", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  async function (response) {
    // Do something with response data
    const result = response.data;
    return result;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default api;
