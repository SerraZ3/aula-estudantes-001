import criptoApi from './apis/mainApi';

const authService = {
  login: async (data: any) => {
    let response = await criptoApi.post('/auth', { ...data });
    return response.data;
  },
  signUp: async (data: any) => {
    let response = await criptoApi.post('/sign-up', { ...data });
    return response.data;
  },
  checkLogin: async () => {
    let response = await criptoApi.get('/auth/check');
    return response.data;
  },
  forgotPassword: async (data: any) => {
    let response = await criptoApi.post('/password/forgot', { ...data });
    return response.data;
  },
  validateTokenResetPassword: async (data: any) => {
    return await criptoApi.get('/password/forgot', { params: { token: data.token } });
  },
  resetPassword: async (data: any) => {
    let response = await criptoApi.put('/password/reset', { ...data });
    return response.data;
  },
  registryConfirm: async (data: any) => {
    return await criptoApi.post('/registry-confirm', { ...data });
  },
};
export default authService;
