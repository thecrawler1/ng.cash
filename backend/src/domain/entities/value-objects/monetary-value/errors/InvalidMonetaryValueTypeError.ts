import BadRequestError from "@domain/errors/BadRequestError";

export default class InvalidMonetaryValueTypeError extends BadRequestError {
  constructor() {
    super('The monetary value must be a number', 'INVALID_MONETARY_VALUE_TYPE');
  }
}
