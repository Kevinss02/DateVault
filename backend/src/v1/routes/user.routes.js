import { Router } from 'express';

import {
  login,
  logout,
  register,
  verifyToken,
} from '../../controllers/user.controller.js';
import { validateSchema } from '../../middlewares/validator.middleware.js';
import { loginSchema } from '../../schemas/login.schema.js';
import { registerSchema } from '../../schemas/register.schema.js';

const router = Router();
router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', verifyToken, logout);
router.get('/verify', verifyToken);
export default router;
