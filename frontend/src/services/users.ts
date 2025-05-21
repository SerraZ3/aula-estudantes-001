import api from './apis/mainApi';

const usersService = {
  create: async (data: any) => {
    let response = await api.post('/users', { ...data });
    return response.data;
  },
  update: async (id: string, data: any) => {
    console.log(id, data)
    let response = await api.put('/users/' + id, { ...data });
    return response.data;
  },
  list: async () => {
    let response = await api.get('/users');
    return response.data;
  },
  delete: async (id: string) => {
    let response = await api.delete('/users/' + id);
    return response.data;
  },
};
export default usersService;
