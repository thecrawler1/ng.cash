import TransactionDTO from '@domain/entities/dtos/TransactionDTO';
import Transaction from '@domain/entities/Transaction';
import User from '@domain/entities/User';
import IController from '@domain/interfaces/controller/IController';
import IRequest from '@domain/interfaces/controller/IRequest';
import IResponse from '@domain/interfaces/controller/IResponse';
import IGetUserTransactionsService, { Filters, TransactionType } from '@domain/interfaces/services/IGetUserTransactionsService';
import { ok } from './helpers/httpResponses';

export default class GetUserTransactionsController implements IController {
  constructor(private getUserTransactionsService: IGetUserTransactionsService) {}

  async handle(request: IRequest): Promise<IResponse> {
    const user: User = User.create(request.payload.userDTO);
    const filters: Filters = GetUserTransactionsController.createFilters(request);
    const transactions: Transaction[] = await this.getUserTransactionsService.perform(user, filters);
    const dtos: TransactionDTO[] = transactions.map((transaction) => transaction.toDTO());

    return ok(dtos);
  }

  private static createFilters({ query }: IRequest): Filters {
    const startDate = query.startDate ? new Date(query.startDate) : undefined;
    const endDate = query.endDate ? new Date(query.endDate) : undefined;
    const transactionType = query.transactionType in TransactionType
      ? query.transactionType as TransactionType
      : TransactionType.both;

    return { startDate, endDate, transactionType };
  }
}
