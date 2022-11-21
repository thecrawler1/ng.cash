import { Table, Model, Column, ForeignKey, BelongsTo, Default, DataType } from 'sequelize-typescript';
import Account from './Account';

@Table({ timestamps: false })
export default class Transaction extends Model {
  @ForeignKey(() => Account)
  @Column
  debitedAccountId: number;

  @BelongsTo(() => Account, 'debitedAccountId')
  debitedAccount: Account;

  @ForeignKey(() => Account)
  @Column
  creditedAccountId: number;

  @BelongsTo(() => Account, 'creditedAccountId')
  creditedAccount: Account;

  @Column({ type: DataType.DECIMAL(12, 2) })
  get value(): number {
    return parseFloat(this.getDataValue('value'));
  }
  set value(value: number) {
    this.setDataValue('value', value);
  }

  @Default(new Date())
  @Column
  createdAt: Date;
}
