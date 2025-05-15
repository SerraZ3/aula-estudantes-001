import Debug from 'debug';
import models from '../../database/models/index.cjs';
const { User } = models;
const debug = Debug('deleteService:dev');

async function deleteService({ id }) {
  const trx = await models.sequelize.transaction();
  try {
    debug('Start', id);

    const userSearch = await User.findOne({ where: { id } });

    if (!userSearch) {
      return { error: true, message: 'Usuário não encontrado' };
    }

    await User.destroy({ where: { id }, transaction: trx });

    await trx.commit();
    return { success: true, data: 'Usuário desativado' };
  } catch (error) {
    await trx.rollback();
    debug('Error:', error);
    return { error: true, message: 'A operação falhou, contate o suporte' };
  }
}
export default deleteService;
