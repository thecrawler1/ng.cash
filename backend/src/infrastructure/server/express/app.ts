import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import cors from 'cors';
import 'express-async-errors';

import sequelize from '@infrastructure/repositories/sequelize/database'

export default class App {
  private readonly _app: Express;
  private readonly _database: Sequelize;

  constructor() {
    this._app = express();
    this._database = sequelize;

    this.config();
  }

  private config(): void {
    this.app.use(cors());
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
