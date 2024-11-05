import axios from "axios";

const register = async (payload) => {
  const request = axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {...payload});
  const value = await request.then(response => response.data);
  const token = value.token;
  localStorage.setItem('token', token);
};

const login = async (payload) => {
  const request = axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {...payload});
  const value =  await request.then(response => response.data);
  const token = value.token;
  localStorage.setItem('token', token);
};

export {
  register,
  login
}