import HttpError from './HttpError';

export default class NotFoundError extends HttpError {
  private static readonly STATUS_CODE = 404;

  constructor(message: string, messageCode: string) {
    super(NotFoundError.STATUS_CODE, message, messageCode);

    this.name = 'NotFoundError';
  }
}
