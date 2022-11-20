import { Request, Response, RequestHandler } from 'express';
import IController from '@domain/interfaces/controller/IController';
import IRequest from '@domain/interfaces/controller/IRequest';
import IResponse from '@domain/interfaces/controller/IResponse';

export default class RouteAdapter {
  static adapt(controller: IController): RequestHandler {
    return async (req: Request, res: Response) => {
      const request: IRequest = {
        query: req.query,
        params: req.params,
        payload: req.body,
      };
      const response: IResponse = await controller.handle(request);

      res.status(response.statusCode).json(response.data);
    };
  }
}
