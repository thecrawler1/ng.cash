import IRequest from './IRequest';
import IResponse from './IResponse';

export default interface IMiddleware {
  handle(request: IRequest): IResponse;
}
