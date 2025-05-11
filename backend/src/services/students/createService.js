import models from '../../database/models/index.cjs';
const { Student } = models;
import cpfValidator from '../../lib/cpfValidator.js';
import Debug from 'debug';
const debug = Debug('createService:dev');

async function createService({ fullname, birthdate, cpf }) {
  const trx = await models.sequelize.transaction();
  try {
    debug('Start', fullname, birthdate, cpf);

    // Se o cpf for inválid tambem gera
    if (!cpfValidator.isCpfValid(cpf)) {
      return { error: true, message: 'CPF is invalid!' };
    }

    // Formata o cpf
    cpf = cpfValidator.formatCpf(cpf);

    // Busca por cpf
    const student = await Student.findOne({ where: { cpf } });

    // Se existir o cpf gera erro
    if (student) {
      return { error: true, message: 'CPF already exist!' };
    }

    // Cria estudante
    const response = await Student.create({ fullname, birthdate, cpf }, { transaction: trx });

    await trx.commit();
    return { success: true, data: response };
  } catch (error) {
    await trx.rollback();
    debug('Error:', error);
    return { error: true, message: 'A operação falhou, contate o suporte' };
  }
}
export default createService;
