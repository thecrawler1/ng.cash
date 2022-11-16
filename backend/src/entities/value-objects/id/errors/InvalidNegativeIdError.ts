import BadRequestError from '../../../../errors/BadRequestError';

export default class InvalidNegativeIdError extends BadRequestError {
  constructor() {
    super('The id must be non-negative', 'INVALID_NEGATIVE_ID');

    this.name = 'InvalidNegativeIdError';
  }
}
