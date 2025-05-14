import Debug from 'debug';

import createService from '../../services/users/createService.js';
import listService from '../../services/users/listService.js';
import showService from '../../services/users/showService.js';
import deleteService from '../../services/users/deleteService.js';
import updateService from '../../services/users/updateService.js';
import forgotPasswordService from '../../services/authentication/forgotPasswordService.js';
import resetPasswordService from '../../services/authentication/resetPasswordService.js';
const debug = Debug('Controller:dev');

export async function forgotPasswordController(req, res, next) {
  debug('user forgotPasswordController');
  const { email } = req.body;

  const data = await forgotPasswordService({ email });

  return res.json(data);
}

export async function resetPasswordController(req, res, next) {
  debug('user resetPasswordController');
  const { password, token } = req.body;

  const data = await resetPasswordService({ password, token });

  return res.json(data);
}
