import HttpError from './HttpError';

export default class UnauthorizedError extends HttpError {
  private static readonly STATUS_CODE = 401;

  constructor(message: string, messageCode: string) {
    super(UnauthorizedError.STATUS_CODE, message, messageCode);

    this.name = 'UnauthorizedError';
  }
}
