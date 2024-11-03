import axios from "axios";

const register = (payload) => {
  const request = axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {...payload});
  const token = request.then(response => response.data);
  localStorage.setItem('token', token);
};

const login = (payload) => {
  const request = axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {...payload});
  const token = request.then(response => response.data);
  localStorage.setItem('token', token);
};

export {
  register,
  login
}