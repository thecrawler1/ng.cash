import User from '@domain/entities/User';
import MonetaryValue from '@domain/entities/value-objects/monetary-value';
import IController from '@domain/interfaces/controller/IController';
import IRequest from '@domain/interfaces/controller/IRequest';
import IResponse from '@domain/interfaces/controller/IResponse';
import IGetUserBalanceService from '@domain/interfaces/services/IGetUserBalanceService';
import { ok } from './helpers/httpResponses';

export default class GetUserBalanceController implements IController {
  constructor(private getUserBalanceService: IGetUserBalanceService) {}

  async handle(request: IRequest): Promise<IResponse> {
    const user: User = User.create(request.payload.userDTO);
    const balance: MonetaryValue = await this.getUserBalanceService.perform(user);

    return ok({ balance: balance.value });
  }
}
