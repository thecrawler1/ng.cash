import AccountDTO from './dtos/AccountDTO';
import Id from './value-objects/Id';
import MonetaryValue from './value-objects/MonetaryValue';

export default class Account {
  private constructor(
    private readonly _id: Id,
    private readonly _balance: MonetaryValue,
  ) {}

  static create({ id, balance }: AccountDTO) {
    return new Account(Id.create(id), MonetaryValue.create(balance));
  }

  toDTO(): AccountDTO {
    return {
      id: this.id.value,
      balance: this.balance.value,
    };
  }

  get id(): Id {
    return this._id;
  }

  get balance(): MonetaryValue {
    return this._balance;
  }
}
