import HttpError from '@core/errors/HttpError';
import IErrorMiddleware from '@core/interfaces/middleware/IErrorMiddleware';
import IErrorResponse from '@core/interfaces/middleware/IErrorResponse';

export default class ErrorHandlerMiddleware implements IErrorMiddleware {
  handle(error: Error): IErrorResponse {
    if (error instanceof HttpError) {
      return {
        statusCode: error.statusCode,
        message: error.message,
        messageCode: error.messageCode,
      };
    }

    console.error(error);

    return {
      statusCode: 500,
      message: 'Internal server error',
      messageCode: 'INTERNAL',
    };
  }
}
