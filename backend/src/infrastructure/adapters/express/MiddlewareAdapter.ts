import { RequestHandler, Request, Response, NextFunction } from 'express';
import IMiddleware from '@domain/interfaces/middleware/IMiddleware';
import IRequest from '@domain/interfaces/middleware/IRequest';
import IResponse from '@domain/interfaces/middleware/IResponse';

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
