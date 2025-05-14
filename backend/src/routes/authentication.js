import express from 'express';
import {
  checkLoginController,
  loginController,
} from '../controllers/authentication/AuthenticationController.js';
import {
  forgotPasswordController,
  resetPasswordController,
} from '../controllers/authentication/ForgotPasswordController.js';
const demandRouter = express.Router();

demandRouter.get('/auth/check', checkLoginController);
demandRouter.post('/auth', loginController);
demandRouter.post('/forgot-password', forgotPasswordController);
demandRouter.post('/reset-password', resetPasswordController);

export default demandRouter;
