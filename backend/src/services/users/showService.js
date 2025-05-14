import Debug from 'debug';
import models from '../../database/models/index.cjs';
const { User } = models;
const debug = Debug('getService:dev');

async function getService({ id }) {
  try {
    debug('Start', id);

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return { error: true, message: 'Usuário não encontrado' };
    }

    return { success: true, data: user };
  } catch (error) {
    debug('Error:', error);
    return { error: true, message: 'A operação falhou, contate o suporte' };
  }
}
export default getService;
