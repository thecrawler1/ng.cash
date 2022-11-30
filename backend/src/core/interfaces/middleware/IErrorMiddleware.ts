import IErrorResponse from './IErrorResponse';

export default interface IErrorMiddleware {
  handle(error: Error): IErrorResponse;
}
