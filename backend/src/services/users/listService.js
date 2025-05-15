import Debug from 'debug';
import models from '../../database/models/index.cjs';
const { User } = models;
const debug = Debug('listService:dev');

async function listService({}) {
  try {
    debug('Start');

    const users = await User.findAll();

    if (!users) {
      return { error: true, message: 'Nenhum usuário encontrado' };
    }

    return { success: true, data: users };
  } catch (error) {
    debug('Error:', error);
    return { error: true, message: 'A operação falhou, contate o suporte' };
  }
}
export default listService;
