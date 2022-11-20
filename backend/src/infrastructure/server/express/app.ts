import express, { Express } from 'express';
import 'express-async-errors';

export default class App {
  private readonly app: Express;

  constructor() {
    this.app = express();
  }

  start(port: number | string): void {
    this.app.listen(port, () => console.log(`Running on port ${port}`));
  }
}
