import Debug from 'debug';
import models from '../../database/models/index.cjs';
import hash from '../../libs/hash.js';
import date from '../../libs/date.js';
const { User, UserToken } = models;
const debug = Debug('forgotPasswordService:dev');
async function forgotPasswordService({ email }) {
  try {
    debug('Start');
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return { error: true, message: 'Usuário não encontrado' };
    }
    const type = 'reset_password';
    const tokenObject = await UserToken.findOne({
      where: {
        userId: user.id,
        type,
      },
    });
    const token = await hash.generateHash(`${user.email}-${type}`);
    const isRevoked = false;
    const tokenExpiration = date.datePlusMinutes(30);
    let newToken;
    console.log(tokenObject);
    if (!tokenObject) {
      newToken = await UserToken.create({
        userId: user.id,
        type,
        token,
        isRevoked,
        tokenExpiration,
      });
    } else {
      newToken = await UserToken.update(
        { isRevoked, token, tokenExpiration },
        { where: { id: tokenObject.id } },
        {},
      );
    }
    if (!newToken) {
      return { error: true, message: 'Falha ao gerar token' };
    }

    //Aqui entraria o código para envio de email
    //Como não o foco do curso é autenticação irei pular essa etapa

    debug(newToken, tokenObject);

    return { success: true };
  } catch (error) {
    debug(error);
    return { error: true, message: 'Erro ao realizar recuperação de enha' };
  }
}
export default forgotPasswordService;
