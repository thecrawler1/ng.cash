import { Table, Model, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Account from './Account';

@Table({ timestamps: false })
export default class Transaction extends Model {
  @ForeignKey(() => Account)
  @Column
  debitedAccountId: number;

  @BelongsTo(() => Account)
  debitedAccount: Account;

  @ForeignKey(() => Account)
  @Column
  creditedAccountId: number;

  @BelongsTo(() => Account)
  creditedAccount: Account;
}
