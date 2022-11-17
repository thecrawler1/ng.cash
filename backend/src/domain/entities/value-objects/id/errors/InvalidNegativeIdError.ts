import BadRequestError from "@domain/errors/BadRequestError";

export default class InvalidNegativeIdError extends BadRequestError {
  constructor() {
    super('The id must be non-negative', 'INVALID_NEGATIVE_ID');
  }
}
