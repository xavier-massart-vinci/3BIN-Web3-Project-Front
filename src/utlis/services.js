import axios from "axios";
import process from 'process';


const register = (payload) => {
  const request = axios.post(`${process.env.API_BASE_URL}/auths/register`, {...payload});
  return request.then(response => response.data);
};
const login = (payload) => {

   const request = axios.post(`${process.env.API_BASE_URL}/auths/login`, {...payload})
   return request.then(response => response.data);
};

export {
    register,
    login
}