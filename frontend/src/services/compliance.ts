import criptoApi from './apis/mainApi';

const complianceService = {
  create: async (data: FormData) => {
    let response = await criptoApi.post('/compliance', data);
    return response.data;
  },
  list: async () => {
    let response = await criptoApi.get('/compliance');
    return response.data;
  },
  upgrade: async (data: FormData) => {
    let response = await criptoApi.post('/compliance/upgrade', data);
    return response.data;
  },
};
export default complianceService;
