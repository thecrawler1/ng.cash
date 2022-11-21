import { Router } from 'express';
import RouteAdapter from '@infrastructure/adapters/express/RouteAdapter';
import MiddlewareAdapter from '@infrastructure/adapters/express/MiddlewareAdapter';
import AuthenticatorMiddlewareFactory from '@infrastructure/factories/AuthenticatorMiddlewareFactory';
import MakeTransferControllerFactory from '@infrastructure/factories/MakeTransferControllerFactory';

const makeTransferController = MakeTransferControllerFactory.make();
const auth = MiddlewareAdapter.adapt(AuthenticatorMiddlewareFactory.make());
const router = Router();

router.post('/', auth, RouteAdapter.adapt(makeTransferController));

export default router;
