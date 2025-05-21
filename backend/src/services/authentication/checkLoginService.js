import Debug from 'debug';
import jsonwebtoken from 'jsonwebtoken';
import authConfig from '../../config/auth.js';
import models from '../../database/models/index.cjs';
const { User } = models;
const debug = Debug('checkLoginService:dev');
async function checkLoginService({ token }) {
  try {
    debug('Start', token);
    let decoded = jsonwebtoken.verify(token, authConfig.jwt.secret);
    debug('asdasdasdas');
    debug(decoded);

    const user = await User.findOne({ where: { id: decoded.sub } });

    if (!user) {
      return { error: true, message: 'Email ou senha inválido' };
    }

    return { success: true, token, user };
  } catch (error) {
    debug('Error', error);
  }
}
export default checkLoginService;
