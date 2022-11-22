import RouteAdapter from '@infrastructure/adapters/express/RouteAdapter';
import LoginControllerFactory from '@infrastructure/factories/LoginControllerFactory';
import ValidateTokenControllerFactory from '@infrastructure/factories/ValidateTokenControllerFactory';
import { Router } from 'express';

const loginController = LoginControllerFactory.make();
const validateTokenController = ValidateTokenControllerFactory.make();
const router = Router();

router.post('/login', RouteAdapter.adapt(loginController));
router.post('/token', RouteAdapter.adapt(validateTokenController));

export default router;
