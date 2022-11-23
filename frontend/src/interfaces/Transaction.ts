export default interface Transaction {
  id: number,
  debitedAccountId: number,
  creditedAccountId: number,
  value: number,
  createdAt: Date,
}
