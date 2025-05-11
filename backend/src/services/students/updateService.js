import Debug from 'debug';
import models from '../../database/models/index.cjs';
import cpfValidator from '../../lib/cpfValidator.js';
const { Student } = models;
const debug = Debug('updateService:dev');

async function updateService({ id, fullname, birthdate, cpf }) {
  const trx = await models.sequelize.transaction();

  try {
    debug('Start', fullname, birthdate, cpf);
    const student = await Student.findOne({ where: { id } });

    // Se não existir o estudante gera erro
    if (!student) {
      return { error: true, message: 'Id inválido' };
    }

    const dataToUpate = {};
    // Caso envie o cpf para atualizar
    if (cpf) {
      if (!cpfValidator.isCpfValid(cpf)) {
        return { error: true, message: 'CPF is invalid!' };
      }

      // Formata o cpf
      cpf = cpfValidator.formatCpf(cpf);
      const studentCpf = await Student.findOne({ where: { cpf } });
      if (studentCpf) {
        return { error: true, message: 'CPF already exist!' };
      }
      dataToUpate.cpf = cpf;
    }
    if (fullname) dataToUpate.fullname = fullname;
    if (birthdate) dataToUpate.birthdate = birthdate;

    const response = await Student.update({ ...dataToUpate }, { where: { id } });
    console.log(response);
    await trx.commit();
    return { success: true, data: { ...student.toJSON(), ...dataToUpate } };
  } catch (error) {
    await trx.rollback();
    debug('Error:', error);
    return { error: true, message: 'A operação falhou, contate o suporte' };
  }
}
export default updateService;
