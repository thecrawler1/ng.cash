import { Router } from 'express';
import CreateUserControllerFactory from '@infrastructure/factories/CreateUserControllerFactory';
import RouteAdapter from '@infrastructure/adapters/express/RouteAdapter';
import GetUserBalanceControllerFactory from '@infrastructure/factories/GetUserBalanceControllerFactory';
import MiddlewareAdapter from '@infrastructure/adapters/express/MiddlewareAdapter';
import AuthenticatorMiddlewareFactory from '@infrastructure/factories/AuthenticatorMiddlewareFactory';

const createUserController = CreateUserControllerFactory.make();
const getUserBalanceController = GetUserBalanceControllerFactory.make();
const auth = MiddlewareAdapter.adapt(AuthenticatorMiddlewareFactory.make());
const router = Router();

router.post('/', RouteAdapter.adapt(createUserController));
router.get('/balance', auth, RouteAdapter.adapt(getUserBalanceController));

export default router;
