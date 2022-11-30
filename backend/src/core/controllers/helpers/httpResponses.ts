import IResponse from '@core/interfaces/controller/IResponse';

const STATUS_CODE_CREATED = 201;
const STATUS_CODE_OK = 200;

export const created = (data: any) => <IResponse> { data, statusCode: STATUS_CODE_CREATED };
export const ok = (data: any) => <IResponse> { data, statusCode: STATUS_CODE_OK };
