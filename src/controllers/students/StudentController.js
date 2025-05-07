import Debug from 'debug';

import createService from '../../services/students/createService.js';
import listService from '../../services/students/listService.js';
import showService from '../../services/students/showService.js';
import deleteService from '../../services/students/deleteService.js';
import updateService from '../../services/students/updateService.js';
const debug = Debug('Controller:dev');

export async function createController(req, res, next) {
  debug('createController');
  const { fullname, birthdate, cpf } = req.body;

  const data = await createService({ fullname, birthdate, cpf });

  return res.json(data);
}

export async function getController(req, res, next) {
  debug('getController');

  const { id } = req.params;
  const data = await showService({ id });
  return res.json(data);
}

export async function listController(req, res, next) {
  debug('listController');

  const { id } = req.params;
  const data = await listService({ id });
  return res.json(data);
}

export async function updateController(req, res, next) {
  debug('updateController');

  const { id } = req.params;
  const { fullname, birthdate, cpf } = req.body;
  const data = await updateService({ id, fullname, birthdate, cpf });
  return res.json(data);
}

export async function deleteController(req, res, next) {
  debug('deleteController');

  const { id } = req.params;
  const data = await deleteService({ id });
  return res.json(data);
}
