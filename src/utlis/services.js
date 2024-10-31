import axios from "axios";
import process from 'process';


const register = (payload) => {
  const request = axios.post(`${process.env.API_BASE_URL}/auths/register`, {...payload});
  const token = request.then(response => response.data);
   localStorage.setItem('token',token);
};

const login = (payload) => {
   const request = axios.post(`${process.env.API_BASE_URL}/auths/login`, {...payload})
   const token = request.then(response => response.data);
   localStorage.setItem('token',token);
};

export {
    register,
    login
}