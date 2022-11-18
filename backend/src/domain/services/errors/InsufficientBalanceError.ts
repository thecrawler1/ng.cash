import UnauthorizedError from '@domain/errors/UnauthorizedError';

export default class InsufficientBalanceError extends UnauthorizedError {
  constructor() {
    super('The balance is insufficient', 'INSUFFICIENT_BALANCE');
  }
}
