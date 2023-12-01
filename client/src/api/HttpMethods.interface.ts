import { ResponseType as AxiosResponseType } from 'axios';
import { IKeyValue } from './HttpService.type';

export interface HttpMethodsInterface {
	get<ResponseType>(
		endpoint: string,
		params?: IKeyValue,
		configs?: { bearerToken: string },
	): Promise<ResponseType>;
}

export type HttpMethodsType = {
	get: <ResponseType>(
		endpoint: string,
		params?: IKeyValue,
		configs?: { bearerToken: string },
	) => Promise<ResponseType>;
};
