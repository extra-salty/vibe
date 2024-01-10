import { HttpMethods, MethodConfigT } from './HttpClient.types';

export class HttpClient {
	private baseUrl: string;
	private config: Record<string, any>;

	constructor(baseUrl: string, config: Record<string, any>) {
		this.baseUrl = baseUrl;
		this.config = config;
	}

	get<ResponseType>(methodConfig: Omit<MethodConfigT, 'data'>) {
		return this.request<ResponseType>(HttpMethods.GET, methodConfig);
	}

	post<ResponseType>(methodConfig: MethodConfigT) {
		return this.request<ResponseType>(HttpMethods.POST, methodConfig);
	}

	patch<ResponseType>(methodConfig: MethodConfigT) {
		return this.request<ResponseType>(HttpMethods.PATCH, methodConfig);
	}

	put<ResponseType>(methodConfig: MethodConfigT) {
		return this.request<ResponseType>(HttpMethods.PUT, methodConfig);
	}

	delete<ResponseType>(methodConfig: MethodConfigT) {
		return this.request<ResponseType>(HttpMethods.DELETE, methodConfig);
	}

	private async request<ResponseType>(
		method: HttpMethods,
		{ endpoint, data, params }: MethodConfigT,
	): Promise<ResponseType> {
		const urlParams = params ? `?${new URLSearchParams(params)}` : '';
		const url = `${this.baseUrl}/${endpoint}${urlParams}`;
		let result;

		try {
			const response = await fetch(url, {
				...this.config,
				method: method,
				headers: {
					'Content-Type': 'application/json',
				},
				// cache: 'default'
				body: JSON.stringify(data),
			});

			if (response.ok) {
				result = await response.json();
				// console.log(result);
			} else {
				throw new Error(`Error occured during ${this.baseUrl}: ${response.status}`);
			}
		} catch (e) {
			console.error(e);
		}

		return result;
	}
}
