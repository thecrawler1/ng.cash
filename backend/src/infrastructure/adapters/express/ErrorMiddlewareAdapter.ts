import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import IErrorMiddleware from '@core/interfaces/middleware/IErrorMiddleware';
import IErrorResponse from '@core/interfaces/middleware/IErrorResponse';

export default class ErrorMiddlewareAdapter {
  static adapt(errorMiddleware: IErrorMiddleware): ErrorRequestHandler {
    return (error: Error, _req: Request, res: Response, _next: NextFunction) => {
      const { statusCode, message, messageCode }: IErrorResponse = errorMiddleware.handle(error);

      res.status(statusCode).json({ message, messageCode });
    };
  }
}
