import express from 'express';
import {
  checkLoginController,
  loginController,
} from '../controllers/authentication/AuthenticationController.js';
import { forgotPasswordController } from '../controllers/authentication/ForgotPasswordController.js';
const demandRouter = express.Router();

demandRouter.get('/auth/check', checkLoginController);
demandRouter.post('/auth', loginController);
demandRouter.post('/forgot-password', forgotPasswordController);

export default demandRouter;
