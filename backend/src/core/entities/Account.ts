import AccountDTO from './dtos/AccountDTO';
import Id from './value-objects/id';
import MonetaryValue from './value-objects/monetary-value';

export default class Account {
  static readonly INITIAL_BALANCE = 100;

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
