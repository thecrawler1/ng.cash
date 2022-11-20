import { expect } from 'chai';
import User from '../../../../src/domain/entities/User';

describe('User entity', function () {
  it('should create an user', function () {
    const user = User.create({ id: 1, accountId: 1, username: 'username', password: 'Abc12345' });

    expect(user.id.value).to.be.equal(1);
    expect(user.accountId.value).to.be.equal(1);
    expect(user.username.value).to.be.equal('username');
    expect(user.password!.value).to.be.equal('Abc12345');
  });
});
