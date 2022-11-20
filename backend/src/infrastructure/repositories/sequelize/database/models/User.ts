import { Table, Model, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Account from './Account';

@Table({ timestamps: false })
export default class User extends Model {
  @Column
  username: string;

  @Column
  password: string;

  @ForeignKey(() => Account)
  @Column
  accountId: number;

  @BelongsTo(() => Account)
  account: Account;
}
