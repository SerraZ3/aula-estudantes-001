import express from 'express';
import {
  createController,
  deleteController,
  getController,
  listController,
  updateController,
} from '../controllers/student/StudentController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const demandRouter = express.Router();

//   CRUD
// * CREATE - Criar
// * READ - Visualizar
// * UPDATE - Atualizar
// * DELETE - Deletar

// CREATE
demandRouter.post('/', authMiddleware(['admin']), createController);
// READ - SHOW
demandRouter.get('/:id', authMiddleware(['admin']), getController);
// READ - LIST
demandRouter.get('/', authMiddleware(['admin']), listController);
// UPDATE
demandRouter.put('/:id', authMiddleware(['admin']), updateController);
// DELETE
demandRouter.delete('/:id', authMiddleware(['admin']), deleteController);

export default demandRouter;
