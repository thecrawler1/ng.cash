import axios from 'axios';

const api = axios.create({
  baseURL: `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export function setToken(token: string) {
  api.defaults.headers.common.Authorization = token;
  localStorage.setItem('token', token);
};

export default api;
