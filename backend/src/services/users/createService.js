import models from '../../database/models/index.cjs';
const { User } = models;
import hash from '../../libs/hash.js';
import Debug from 'debug';
const debug = Debug('createService:dev');

async function createService({ fullname, role, email, password }) {
  const trx = await models.sequelize.transaction();
  try {
    debug('Start', fullname, role, email);

    // Busca por email
    const user = await User.findOne({ where: { email } });
    // Se existir o email gera erro
    if (user) {
      return { error: true, message: 'Email already exist!' };
    }

    //Gera senha do usuário
    let passwordHash = await hash.generateHash(password);

    // Cria estudante
    const response = await User.create(
      { fullname, role, email, password: passwordHash },
      { transaction: trx },
    );

    await trx.commit();
    return { success: true, data: response };
  } catch (error) {
    await trx.rollback();
    debug('Error:', error);
    return { error: true, message: 'A operação falhou, contate o suporte' };
  }
}
export default createService;
