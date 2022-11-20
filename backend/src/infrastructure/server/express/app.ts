import express, { Express } from 'express';
import 'express-async-errors';

export default class App {
  private readonly _app: Express;

  constructor() {
    this._app = express();
  }

  start(port: number | string): void {
    this.app.listen(port, () => console.log(`Running on port ${port}`));
  }

  get app(): Express {
    return this._app;
  }
}
