export default interface TransactionDTO {
  id: number,
  debitedAccountId: number,
  creditedAccountId: number,
  value: number,
  createdAt: Date,
}
