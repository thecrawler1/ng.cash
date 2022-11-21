import { Table, Model, Column, DataType, HasOne, HasMany } from 'sequelize-typescript';
import User from './User';
import Transaction from './Transaction';

@Table({ timestamps: false })
export default class Account extends Model {
  @Column({ type: DataType.DECIMAL(12, 2) })
  get balance(): number {
    return parseFloat(this.getDataValue('balance'));
  }
  set balance(value: number) {
    this.setDataValue('balance', value);
  }

  @HasOne(() => User)
  user: User;

  @HasMany(() => Transaction, 'debitedAccountId')
  debitedTransactions: Transaction[]

  @HasMany(() => Transaction, 'creditedAccountId')
  creditedTransactions: Transaction[]
}
