import { Table, Model, Column, ForeignKey, BelongsTo, Default, DataType } from 'sequelize-typescript';
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

  @Column({ type: DataType.DECIMAL(12, 2) })
  value: number;

  @Default(new Date())
  @Column
  createdAt: Date;
}
