import Debug from 'debug';

import loginService from '../../services/authentication/loginService.js';
import checkLoginService from '../../services/authentication/checkLoginService.js';
const debug = Debug('Controller:dev');

export async function loginController(req, res, next) {
  debug('user loginController');
  const { email, password } = req.body;

  const data = await loginService({ email, password });

  return res.json(data);
}

export async function checkLoginController(req, res, next) {
  debug('user checkLoginController');
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: true, message: 'Sem permissão' });
  }

  const [, token] = authHeader.split(' ');

  const data = await checkLoginService({ token });

  return res.json(data);
}
