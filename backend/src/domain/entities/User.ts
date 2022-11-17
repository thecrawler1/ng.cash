import UserDTO from './dtos/UserDTO';
import Id from './value-objects/id';
import Username from './value-objects/username';
import Password from './value-objects/password';

export default class User {
  private constructor(
    private readonly _id: Id,
    private readonly _accountId: Id,
    private readonly _username: Username,
    private readonly _password?: Password,
  ) {}

  static create(userDTO: UserDTO): User {
    const id = Id.create(userDTO.id);
    const accountId = Id.create(userDTO.accountId);
    const username = Username.create(userDTO.username);
    const password = userDTO.password ? Password.create(userDTO.password) : undefined;
    
    return new User(id, accountId, username, password);
  }

  toDTO(): UserDTO {
    return {
      id: this.id.value,
      accountId: this.accountId.value,
      username: this.username.value,
      password: this.password?.value,
    };
  }

  get id(): Id {
    return this._id;
  }

  get accountId(): Id {
    return this._accountId;
  }

  get username(): Username {
    return this._username;
  }

  get password(): Password | undefined {
    return this._password;
  }
}
