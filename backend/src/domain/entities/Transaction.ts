import TransactionDTO from './dtos/TransactionDTO';
import InvalidTransactionToTheSameAccountError from './errors/InvalidTransactionToTheSameAccountError';
import Id from './value-objects/id';
import MonetaryValue from './value-objects/monetary-value';

export default class Transaction {
  private constructor(
    private readonly _id: Id,
    private readonly _debitedAccountId: Id,
    private readonly _creditedAccountId: Id,
    private readonly _value: MonetaryValue,
    private readonly _createdAt: Date,
  ) {}

  static create(transactionDTO: TransactionDTO): Transaction {
    const id = Id.create(transactionDTO.id);
    const debitedAccountId = Id.create(transactionDTO.debitedAccountId);
    const creditedAccountId = Id.create(transactionDTO.creditedAccountId);
    const value = MonetaryValue.create(transactionDTO.value);
    const { createdAt } = transactionDTO;

    this.validateIfTheAccountsAreDifferents(debitedAccountId, creditedAccountId);

    return new Transaction(id, debitedAccountId, creditedAccountId, value, createdAt);
  }

  private static validateIfTheAccountsAreDifferents(sourceId: Id, destinationId: Id): void {
    if (sourceId.equals(destinationId)) {
      throw new InvalidTransactionToTheSameAccountError();
    }
  }

  toDTO(): TransactionDTO {
    return {
      id: this.id.value,
      debitedAccountId: this.debitedAccountId.value,
      creditedAccountId: this.creditedAccountId.value,
      value: this.value.value,
      createdAt: this.createdAt,
    };
  }

  get id(): Id {
    return this._id;
  }

  get debitedAccountId(): Id {
    return this._debitedAccountId;
  }

  get creditedAccountId(): Id {
    return this._creditedAccountId;
  }

  get value(): MonetaryValue {
    return this._value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
}
