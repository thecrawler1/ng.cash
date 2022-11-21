import RouteAdapter from '@infrastructure/adapters/express/RouteAdapter';
import LoginControllerFactory from '@infrastructure/factories/LoginControllerFactory';
import { Router } from 'express';

const loginController = LoginControllerFactory.make();
const router = Router();

router.post('/', RouteAdapter.adapt(loginController))

export default router;
