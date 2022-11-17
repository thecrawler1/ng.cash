import { expect } from 'chai';
import Account from '@domain/entities/Account';

describe('Account entity', function () {
  it('should create an account', function () {
    const account = Account.create({ id: 1, balance: 3.14 });

    expect(account.id.value).to.be.equal(1);
    expect(account.balance.value).to.be.equal(3.14);
  });
});
