import express from 'express';
import {
  createController,
  getController,
  listController,
} from '../controllers/student/StudentFileController.js';
import uploadFile from '../libs/uploadFiles.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const studentFileRouter = express.Router();

//   CRUD
// * CREATE - Criar
// * READ - Visualizar
// * UPDATE - Atualizar
// * DELETE - Deletar

// CREATE
studentFileRouter.post(
  '/:id/upload',
  uploadFile.fields([
    { name: 'historico', maxCount: 1 },
    { name: 'foto', maxCount: 1 },
  ]),
  authMiddleware(['admin']),
  createController,
);
// READ - SHOW
studentFileRouter.get('/file/:id', authMiddleware(['admin']), getController);
studentFileRouter.get('/files/:id', authMiddleware(['admin']), listController);

export default studentFileRouter;
