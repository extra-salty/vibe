import axios, {
	AxiosRequestConfig,
	AxiosInstance,
	AxiosError,
	Method,
	ResponseType as AxiosResponseType,
} from 'axios';
import { STATUS_CODES } from 'http';

// config?: any;
// this.config = config;
export class HttpClient {
	private axios: AxiosInstance;

	constructor(config: any) {
		this.axios = axios.create();
	}

	// axios(): any {
	// 	const axiosInstance = axios.create(this.config);
	// 	return axiosInstance;
	// }

	request<ResponseType>(
		method: Method,
		endpoint: string,
		data?: any,
		responseType?: AxiosResponseType,
	): Promise<ResponseType> {
		const requestConfig = {
			method,
			data,
			responseType,
		} as AxiosRequestConfig;

		// const promise = new Promise<ResponseType>(() => {
		return axios
			.get('https://swapi.dev/api/people/1')
			.then((response) => response.data)
			.catch(function (error) {
				// handle error
				console.log('error asd');
				console.log(error);
			}) as Promise<ResponseType>;
		// });

		// return promise;
	}
}

// private handleError(error: AxiosError) {
// 	const { status } = error;

// 	switch (status) {
// 		case STATUS_CODES.InternalServerError: {
// 			// Handle InternalServerError
// 			break;
// 		}
// 		case STATUS_CODES.Forbidden: {
// 			// Handle Forbidden
// 			break;
// 		}
// 		case STATUS_CODES.Unauthorized: {
// 			// Handle Unauthorized
// 			break;
// 		}
// 		case STATUS_CODES.TooManyRequests: {
// 			// Handle TooManyRequests
// 			break;
// 		}
// 	}

// 	return Promise.reject(error);
// }
