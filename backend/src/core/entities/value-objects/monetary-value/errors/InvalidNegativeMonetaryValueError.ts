import BadRequestError from "@core/errors/BadRequestError";

export default class InvalidNegativeMonetaryValueError extends BadRequestError {
  constructor() {
    super('The monetary value must be non-negative', 'INVALID_NEGATIVE_MONETARY_VALUE');
  }
}
