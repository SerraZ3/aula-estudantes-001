import Debug from 'debug';

import createService from '../../services/users/createService.js';
import listService from '../../services/users/listService.js';
import showService from '../../services/users/showService.js';
import deleteService from '../../services/users/deleteService.js';
import updateService from '../../services/users/updateService.js';
const debug = Debug('Controller:dev');

export async function createController(req, res, next) {
  debug('user createController');
  const { fullname, email, role, password } = req.body;

  const data = await createService({ fullname, email, role, password });

  return res.json(data);
}

export async function getController(req, res, next) {
  debug('user getController');

  const { id } = req.params;

  const data = await showService({ id });
  return res.json(data);
}

export async function listController(req, res, next) {
  debug('user listController');
  const { teste } = req.query;
  debug(teste);
  // users/:id
  const { id } = req.params;
  const data = await listService({ id });
  return res.json(data);
}

export async function updateController(req, res, next) {
  debug('user updateController');

  const { id } = req.params;
  const { fullname, role, email, password } = req.body;
  const data = await updateService({ id, fullname, role, email, password });
  return res.json(data);
}

export async function deleteController(req, res, next) {
  debug('user deleteController');

  const { id } = req.params;
  const data = await deleteService({ id });
  return res.json(data);
}
