import Transaction from '@core/entities/Transaction';
import User from '@core/entities/User';
import MonetaryValue from '@core/entities/value-objects/monetary-value';
import Username from '@core/entities/value-objects/username';
import IController from '@core/interfaces/controller/IController';
import IRequest from '@core/interfaces/controller/IRequest';
import IResponse from '@core/interfaces/controller/IResponse';
import IMakeTransferService from '@core/interfaces/services/IMakeTransferService';
import RequiredPayloadNotProvidedError from './errors/RequiredPaylodNotProvidedError';
import { created } from './helpers/httpResponses';

export default class MakeTransferController implements IController {
  constructor(private makeTransferService: IMakeTransferService) {}

  async handle(request: IRequest): Promise<IResponse> {
    MakeTransferController.validateRequest(request);

    const user: User = User.create(request.payload.userDTO);
    const destinationUsername: Username = Username.create(request.payload.destinationUsername);
    const amount: MonetaryValue = MonetaryValue.create(request.payload.amount);
    const transaction: Transaction = await this.makeTransferService.perform(user, destinationUsername, amount);

    return created(transaction.toDTO());
  }

  private static validateRequest({ payload }: IRequest): void {
    if (!payload.destinationUsername || !payload.amount) {
      throw new RequiredPayloadNotProvidedError();
    }
  }
}
