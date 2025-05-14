import Debug from 'debug';
import models from '../../database/models/index.cjs';
import hash from '../../libs/hash.js';
import date from '../../libs/date.js';
const { User, UserToken } = models;
const debug = Debug('resetPasswordService:dev');
async function resetPasswordService({ token, password }) {
  try {
    debug('Start');

    // 1- Verificar se o token existe no banco de dados. Caso não exista gere erro
    // 2- Verificar se o token é do tipo reset_password e se isRevoked é false. Caso contrário gere erro
    // 3- Verifique se a data de expiração passou. Caso tenha expirado gere erro
    // 4- Revogue o token para que ele não possa mais se usado
    // 5- Busque o usuário a partir do token
    // 6- Atualize a senha do usuário
    // 7- Aplique transaction em todas as operações
    const userToken = await UserToken.findOne({ where: { token } });

    if (!userToken) {
      return { error: true, message: 'Token não encontrado' };
    }
    if (
      !userToken ||
      userToken.isRevoked ||
      userToken.type !== 'reset_password'
    ) {
      return { error: true, message: 'Token não encontrado' };
    }
    if (date.isExpired(userToken.tokenExpiration)) {
      return { error: true, message: 'Token expirado' };
    }

    await UserToken.update(
      { isRevoked: true },
      { where: { id: userToken.id } },
      {},
    );

    const user = await User.findOne({ where: { id: userToken.userId } });

    if (!user) {
      return { error: true, message: 'Usuário não encontrado' };
    }
    //Gera senha do usuário
    let passwordHash = await hash.generateHash(password);

    await User.update({ password: passwordHash }, { where: { id: user.id } });

    return { success: true };
  } catch (error) {
    debug(error);
    return { error: true, message: 'Erro ao realizar recuperação de enha' };
  }
}
export default resetPasswordService;
