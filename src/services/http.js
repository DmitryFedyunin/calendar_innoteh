import axios from 'axios';

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response.data),
);

const Http = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? 'http://mybusiness.f.atwinta.ru/api/'
    : 'http://mybusiness.f.atwinta.ru/api/',
});

Http.interceptors.request.use(
  // (config) => {
  //   const token = localStorage.getItem('token');
  //
  //   if (token) {
  //     // eslint-disable-next-line
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  //
  //   return config;
  // },
  (reason) => Promise.reject(reason),
);

export default Http;
