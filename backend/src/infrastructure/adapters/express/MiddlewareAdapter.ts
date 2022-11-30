import { RequestHandler, Request, Response, NextFunction } from 'express';
import IMiddleware from '@core/interfaces/middleware/IMiddleware';
import IRequest from '@core/interfaces/middleware/IRequest';
import IResponse from '@core/interfaces/middleware/IResponse';

export default class MiddlewareAdapter {
  static adapt(middleware: IMiddleware): RequestHandler {
    return (req: Request, _res: Response, next: NextFunction) => {
      const request: IRequest = { token: req.headers.authorization };
      const response: IResponse = middleware.handle(request);

      Object.assign(req.body, response.body);

      next();
    };
  }
}
