import Debug from 'debug';
import models from '../../database/models/index.cjs';
const { Student } = models;
const debug = Debug('getService:dev');

async function getService({ id }) {
  try {
    debug('Start', id);

    const student = await Student.findOne({ where: { id } });

    if (!student) {
      return { error: true, message: 'Estudante não encontrado' };
    }

    return { success: true, data: student };
  } catch (error) {
    debug('Error:', error);
    return { error: true, message: 'A operação falhou, contate o suporte' };
  }
}
export default getService;
