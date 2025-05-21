import Debug from 'debug';

import createService from '../../services/students/fileCreateService.js';
import listService from '../../services/students/fileListService.js';
import showService from '../../services/students/fileShowService.js';
const debug = Debug('StudentController:dev');

export async function createController(req, res, next) {
  debug('createController');
  const { id: studentId } = req.params;
  console.log(studentId, req.file);
  const data = await createService({ files: req.files, studentId });

  return res.json(data);
}

export async function getController(req, res, next) {
  debug('getController');

  const { id } = req.params;
  const data = await showService({ fileId: id });
  return res.json(data);
}
export async function listController(req, res, next) {
  debug('listController');

  const { id } = req.params;
  const data = await listService({ studentId: id });
  return res.json(data);
}
