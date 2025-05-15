import models from '../../database/models/index.cjs';
const { User } = models;
import jsonwebtoken from 'jsonwebtoken';
import authConfig from '../../config/auth.js';
import hash from '../../libs/hash.js';
import Debug from 'debug';
const debug = Debug('loginService:dev');
async function loginService({ email, password }) {
  try {
    debug('Start');
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return { error: true, message: 'Email ou senha inválido' };
    }

    const passwordMatched = await hash.compareHash(password, user.password);
    if (!passwordMatched) {
      return { error: true, message: 'Senha incorreta' };
    }
    const { secret, expiresIn } = authConfig.jwt;

    const token = jsonwebtoken.sign(
      {
        teste: `${user.id}`,
      },
      secret,
      {
        subject: `${user.id}`,
        expiresIn,
      },
    );

    return { success: true, user, token };
  } catch (error) {
    return { error: true, message: 'Erro ao realizar login' };
  }
}
export default loginService;
