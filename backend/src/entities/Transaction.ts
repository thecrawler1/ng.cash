import TransactionDTO from './dtos/TransactionDTO';
import Id from './value-objects/Id';
import MonetaryValue from './value-objects/MonetaryValue';

export default class Transaction {
  private constructor(
    private readonly _id: Id,
    private readonly _debitedAccountId: Id,
    private readonly _creditedAccountId: Id,
    private readonly _value: MonetaryValue,
    private readonly _createdAt: Date,
  ) {}

  static create(transactionDTO: TransactionDTO): Transaction {
    return new Transaction(
      Id.create(transactionDTO.id),
      Id.create(transactionDTO.debitedAccountId),
      Id.create(transactionDTO.creditedAccountId),
      MonetaryValue.create(transactionDTO.value),
      transactionDTO.createdAt,
    );
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
