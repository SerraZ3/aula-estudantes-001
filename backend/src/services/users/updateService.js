import Debug from 'debug';
import models from '../../database/models/index.cjs';
import hash from '../../libs/hash.js';
const { User } = models;
const debug = Debug('updateService:dev');

async function updateService({ id, fullname, role, email, password }) {
  const trx = await models.sequelize.transaction();

  try {
    debug('Start', fullname, role, email);
    const user = await User.findOne({ where: { id } });

    // Se não existir o estudante gera erro
    if (!user) {
      return { error: true, message: 'Id inválido' };
    }

    const dataToUpate = {};
    // Caso envie o email para atualizar
    if (email) {
      const checkEmail = await User.findOne({ where: { email } });
      if (checkEmail) {
        return { error: true, message: 'Email already exist!' };
      }
      dataToUpate.email = email;
    }
    if (fullname) dataToUpate.fullname = fullname;
    if (role) dataToUpate.role = role;
    if (password) {
      //Gera senha do usuário
      let passwordHash = await hash.generateHash(password);
      dataToUpate.password = passwordHash;
    }

    const response = await User.update({ ...dataToUpate }, { where: { id } });
    await trx.commit();
    return { success: true, data: { ...user.toJSON(), ...dataToUpate } };
  } catch (error) {
    await trx.rollback();
    debug('Error:', error);
    return { error: true, message: 'A operação falhou, contate o suporte' };
  }
}
export default updateService;
