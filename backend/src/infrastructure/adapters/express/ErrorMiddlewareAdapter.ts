import { Request, Response, ErrorRequestHandler } from 'express';
import IErrorMiddleware from '@domain/interfaces/middleware/IErrorMiddleware';
import IErrorResponse from '@domain/interfaces/middleware/IErrorResponse';

export default class ErrorMiddlewareAdapter {
  static adapt(errorMiddleware: IErrorMiddleware): ErrorRequestHandler {
    return (error: Error, _req: Request, res: Response) => {
      const { statusCode, message, messageCode }: IErrorResponse = errorMiddleware.handle(error);

      res.status(statusCode).json({ message, messageCode });
    };
  }
}
