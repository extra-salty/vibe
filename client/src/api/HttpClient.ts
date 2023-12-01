import axios, { AxiosRequestConfig, Method, AxiosInstance, AxiosError } from 'axios';
import { STATUS_CODES } from 'http';

export class HttpClient {
	config?: any;
	private axios: AxiosInstance;

	constructor(config: any) {
		this.config = config;
		this.axios = axios.create(config ? this.config : {});
	}

	// axios(): any {
	// 	const axiosInstance = axios.create(this.config);
	// 	return axiosInstance;
	// }

	request<ResponseType>(
		method: Method,
		endpoint: string,
		responseType?: ResponseType,
	): Promise<ResponseType> {
		const requestConfig = {
			method,
			responseType,
		} as AxiosRequestConfig;

		const promise = new Promise<ResponseType>((resolve, reject) => {
			this.axios(requestConfig)
				.then((response) => resolve(response.data))
				.catch((error) => {
					console.error('Unidentified Fetch Error: ', error);
				});
		});

		return promise;
	}

	private handleError(error: AxiosError) {
		const { status } = error;

		switch (status) {
			case STATUS_CODES.InternalServerError: {
				// Handle InternalServerError
				break;
			}
			case STATUS_CODES.Forbidden: {
				// Handle Forbidden
				break;
			}
			case STATUS_CODES.Unauthorized: {
				// Handle Unauthorized
				break;
			}
			case STATUS_CODES.TooManyRequests: {
				// Handle TooManyRequests
				break;
			}
		}

		return Promise.reject(error);
	}
}
