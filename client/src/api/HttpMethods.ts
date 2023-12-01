import { HttpClient } from './HttpClient';
import { HttpMethodsInterface } from './HttpMethods.interface';

// export class HttpMethods extends HttpClient implements HttpMethodsInterface {
// 	get<ResponseType>(endpoint: string, params?: any) {
// 		return this.request<ResponseType>('GET', endpoint, params);
// 	}
// }

export class HttpMethods extends HttpClient implements HttpMethodsInterface {
	get<ResponseType>(endpoint: string) {
		return this.request<ResponseType>('GET', endpoint);
	}
}
