import UnauthorizedError from '@domain/errors/UnauthorizedError';

export default class InvalidTransferToYourselfError extends UnauthorizedError {
  constructor() {
    super(
      'It is invalid to make a transfer to yourself',
      'INVALID_TRANSFER_TO_YOURSELF',
    );
  }
}
