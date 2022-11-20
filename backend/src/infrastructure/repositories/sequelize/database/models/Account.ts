import { Table, Model, Column, DataType, HasOne, HasMany } from 'sequelize-typescript';
import User from './User';
import Transaction from './Transaction';

@Table({ timestamps: false })
export default class Account extends Model {
  @Column({ type: DataType.DECIMAL(12, 2) })
  balance: number;

  @HasOne(() => User)
  user: User;

  @HasMany(() => Transaction)
  debitedTransactions: Transaction[]

  @HasMany(() => Transaction)
  creditedTransactions: Transaction[]
}
