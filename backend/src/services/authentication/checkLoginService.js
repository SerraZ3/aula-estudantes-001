import Debug from 'debug';
import jsonwebtoken from 'jsonwebtoken';
import authConfig from '../../config/auth.js';
import models from '../../database/models/index.cjs';
const { User } = models;
const debug = Debug('checkLoginService:dev');
async function checkLoginService({ token }) {
  try {
    debug('Start');
    let decoded = jsonwebtoken.verify(token, authConfig.jwt.secret);
    debug('asdasdasdas');
    debug(decoded);

    return { success: true, token };
  } catch (error) {
    debug('Error', error);
  }
}
export default checkLoginService;
