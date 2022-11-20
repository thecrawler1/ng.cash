import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import cors from 'cors';
import 'express-async-errors';

import ErrorMiddlewareAdapter from '@infrastructure/adapters/express/ErrorMiddlewareAdapter';
import ErrorHandlerMiddleware from '@domain/middlewares/ErrorHandlerMiddleware';
import sequelize from '@infrastructure/repositories/sequelize/database'
import userRouter from './routers/userRouter';

export default class App {
  private readonly _app: Express;
  private readonly _database: Sequelize;

  constructor() {
    this._app = express();
    this._database = sequelize;

    this.config();
    this.addRouters();
    this.addErrorHandler();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private addRouters(): void {
    this.app.use('/users', userRouter);
  }

  private addErrorHandler(): void {
    const errorHandler = ErrorMiddlewareAdapter.adapt(new ErrorHandlerMiddleware())
    this.app.use(errorHandler);
  }

  start(port: number | string): void {
    this.app.listen(port, () => console.log(`Running on port ${port}`));
  }

  get app(): Express {
    return this._app;
  }

  get database(): Sequelize {
    return this._database;
  }
}
