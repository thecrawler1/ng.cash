import HttpError from './HttpError';

export default class BadRequestError extends HttpError {
  private static readonly STATUS_CODE = 400;

  constructor(message: string, messageCode: string) {
    super(BadRequestError.STATUS_CODE, message, messageCode);

    this.name = 'BadRequestError';
  }
}
