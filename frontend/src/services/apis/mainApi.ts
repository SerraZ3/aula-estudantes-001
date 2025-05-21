import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import authStorage from '../../storage/auth';

const validToken = (token: string) => {
  let decodedToken: any = jwtDecode(token);
  let currentDate = new Date();

  if (decodedToken) {
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      authStorage.remove();
      // userStorage.remove();
      window.location.reload();
      throw new axios.Cancel('Operation canceled! Invalid Token');
    }
  }
};
// Criando api para comunicação com servidor
const criptoApi = axios.create({
  baseURL: '/server',
  // baseURL: 'http://localhost:3333/api/v1',
  // withCredentials: true,
  // credentials: true, //access-control-allow-credentials:true
  // optionSuccessStatus: 200,
});

// Adicionando interceptor para inserir token Bearer de autenticação no header
criptoApi.interceptors.request.use(
  async (config) => {
    const token = await authStorage.get();

    if (token) {
      validToken(token);
    }
console.log(token)
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token || ''}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
const timeout = 300000; // Equal 5 minutes, 1000 === 1 second
criptoApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { data, status } = error.response;
      // console.error('Response Error:', data);
      // console.error('Status:', status);
      // console.error('Headers:', headers);
      const token = authStorage.get();
      if (status === 401 && token) {
        authStorage.remove();
        window.location.replace('/');
      }

      return Promise.reject(data);
    } else if (error.request) {
      if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
        error.message = `Timeout excedeu ${timeout}ms`;
        return Promise.reject(error);
      }

      return Promise.reject(error.request);
    } else {
      console.error('Error:', error.message);

      return Promise.reject(error.message);
    }
  },
);

export default criptoApi;
