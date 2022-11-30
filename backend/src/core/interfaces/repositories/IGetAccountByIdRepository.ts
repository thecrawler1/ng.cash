import Account from '@core/entities/Account';
import Id from '@core/entities/value-objects/id';

export default interface IGetAccountByIdRepository {
  perform(id: Id): Promise<Account>;
}
