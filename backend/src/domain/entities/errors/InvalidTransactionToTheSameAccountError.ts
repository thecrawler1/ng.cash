import UnauthorizedError from '@domain/errors/UnauthorizedError';

export default class InvalidTransactionToTheSameAccountError extends UnauthorizedError {
  constructor() {
    super(
      'Invalid transaction with source account equal to destination account',
      'TRANSACTION_TO_SOURCE_ACCOUNT',
    );
  }
}
