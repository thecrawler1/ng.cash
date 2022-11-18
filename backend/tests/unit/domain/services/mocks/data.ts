import Account from '@domain/entities/Account';
import User from '@domain/entities/User';

export const user = User.create({
  id: 1,
  accountId: 1,
  username: 'username',
  password: 'Abc12345',
});

export const account = Account.create({
  id: 1,
  balance: 123.45,
});
