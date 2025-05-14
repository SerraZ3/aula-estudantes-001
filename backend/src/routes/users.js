import express from 'express';
import {
  createController,
  deleteController,
  getController,
  listController,
  updateController,
} from '../controllers/user/UserController.js';

const demandRouter = express.Router();

//   CRUD
// * CREATE - Criar
// * READ - Visualizar
// * UPDATE - Atualizar
// * DELETE - Deletar

// CREATE
demandRouter.post('/', createController);
// READ - SHOW
demandRouter.get('/:id', getController);
// READ - LIST
demandRouter.get('/', listController);
// UPDATE
demandRouter.put('/:id', updateController);
// DELETE
demandRouter.delete('/:id', deleteController);

export default demandRouter;
