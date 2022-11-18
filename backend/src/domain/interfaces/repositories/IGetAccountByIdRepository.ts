import Account from '@domain/entities/Account';
import Id from '@domain/entities/value-objects/id';

export default interface IGetAccountByIdRepository {
  perform(id: Id): Promise<Account>;
}
