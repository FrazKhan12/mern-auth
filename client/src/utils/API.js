import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

export const getHTTPrequest = async (url) => {
  try {
    const response = await API.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postHTTPrequest = async (url, data) => {
  try {
    const response = await API.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putHTTPrequest = async (url, data) => {
  try {
    const response = await API.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteHTTPrequest = async (url, data) => {
  try {
    const response = await API.delete(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default API;
