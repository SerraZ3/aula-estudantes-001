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

    return { success: true };
  } catch (error) {
    debug(error);
    return { error: true, message: 'Erro ao realizar recuperação de enha' };
  }
}
export default resetPasswordService;
