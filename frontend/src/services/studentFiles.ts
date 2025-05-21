import api from './apis/mainApi';

const studentFilesService = {
  show: async (fileId: string) => {
    let response = await api.get('/students/file/' + fileId);
    return response.data;
  },
  list: async (studentId: string) => {
    let response = await api.get('/students/files/' + studentId);
    return response.data;
  },
};
export default studentFilesService;
