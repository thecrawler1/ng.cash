import { Router } from 'express';
import CreateUserControllerFactory from '@infrastructure/factories/CreateUserControllerFactory';
import RouteAdapter from '@infrastructure/adapters/express/RouteAdapter';

const createUserController = CreateUserControllerFactory.make();
const router = Router();

router.post('/', RouteAdapter.adapt(createUserController));

export default router;
