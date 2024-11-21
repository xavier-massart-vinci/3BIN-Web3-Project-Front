import axios from "axios";
import { socket } from "../socket";

let useJustRegister = false;

const register = async (payload) => {
  const request = axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
    { ...payload }
  );
  const value = await request.then((response) => response.data);
  const token = value.token;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(value.user));
  socket.auth = { token: token };
  socket.connect();
  useJustRegister = true;
};

const login = async (payload) => {
  const request = axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
    { ...payload }
  );
  const value = await request.then((response) => response.data);
  const token = value.token;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(value.user));
  socket.auth = { token: token };
  socket.connect();
};

const logout = () => {
  localStorage.clear();
  socket.disconnect();
  window.location.reload();
};

export { login, logout, register, useJustRegister };
