import User from '@core/entities/User';
import MonetaryValue from '@core/entities/value-objects/monetary-value';
import IController from '@core/interfaces/controller/IController';
import IRequest from '@core/interfaces/controller/IRequest';
import IResponse from '@core/interfaces/controller/IResponse';
import IGetUserBalanceService from '@core/interfaces/services/IGetUserBalanceService';
import { ok } from './helpers/httpResponses';

export default class GetUserBalanceController implements IController {
  constructor(private getUserBalanceService: IGetUserBalanceService) {}

  async handle(request: IRequest): Promise<IResponse> {
    const user: User = User.create(request.payload.userDTO);
    const balance: MonetaryValue = await this.getUserBalanceService.perform(user);

    return ok({ balance: balance.value });
  }
}
