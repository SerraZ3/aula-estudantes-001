import Debug from 'debug';
import models from '../../database/models/index.cjs';
const { Student } = models;
const debug = Debug('deleteService:dev');

async function deleteService({ id }) {
  const trx = await models.sequelize.transaction();
  try {
    debug('Start', id);

    const studentSearch = await Student.findOne({ where: { id } });

    if (!studentSearch) {
      return { error: true, message: 'Estudante não encontrado' };
    }

    await Student.destroy({ where: { id }, transaction: trx });

    await trx.commit();
    return { success: true, data: 'Estudante desativado' };
  } catch (error) {
    await trx.rollback();
    debug('Error:', error);
    return { error: true, message: 'A operação falhou, contate o suporte' };
  }
}
export default deleteService;
