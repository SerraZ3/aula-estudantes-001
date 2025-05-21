import api from './apis/mainApi';

const studentsService = {
  create: async (data: any) => {
    let response = await api.post('/students', { ...data });
    return response.data;
  },
  update: async (id: string, data: any) => {
    console.log(id, data);
    let response = await api.put('/students/' + id, { ...data });
    return response.data;
  },
  list: async () => {
    let response = await api.get('/students');
    return response.data;
  },
  show: async (id: string) => {
    let response = await api.get('/students/' + id);
    return response.data;
  },
  delete: async (id: string) => {
    let response = await api.delete('/students/' + id);
    return response.data;
  },
};
export default studentsService;
