import Debug from 'debug';
import models from '../../database/models/index.cjs';
const { Student } = models;
const debug = Debug('listService:dev');

async function listService({}) {
  try {
    debug('Start');

    const students = await Student.findAll();

    if (!students) {
      return { error: true, message: 'Nenhum estudante encontrado encontrada' };
    }

    return { success: true, data: students };
  } catch (error) {
    debug('Error:', error);
    return { error: true, message: 'A operação falhou, contate o suporte' };
  }
}
export default listService;
