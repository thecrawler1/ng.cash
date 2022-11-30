import { expect } from 'chai';
import Transaction from '../../../../src/core/entities/Transaction';

describe('Transaction entity', function () {
  it('should create a transaction', function () {
    const now = new Date();

    const transaction = Transaction.create({
      id: 1,
      debitedAccountId: 1,
      creditedAccountId: 2,
      value: 3.14,
      createdAt: now,
    });

    expect(transaction.id.value).to.be.equal(1);
    expect(transaction.debitedAccountId.value).to.be.equal(1);
    expect(transaction.creditedAccountId.value).to.be.equal(2);
    expect(transaction.value.value).to.be.equal(3.14);
    expect(transaction.createdAt).to.be.equal(now);
  });
});
