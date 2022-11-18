import IResponse from '@domain/interfaces/controller/IResponse';

const STATUS_CODE_CREATED = 201;

export const created = (data: any) => <IResponse> { data, statusCode: STATUS_CODE_CREATED };
