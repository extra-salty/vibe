import { HttpMethods } from '../HttpMethods';

// headers: Readonly<Record<string, string | boolean>>
const VercelServiceConfig = {
	baseURL: 'https://swapi.dev/api',
	timeout: 1000,
	headers: {
		Accept: 'application/json',
	},
};

class VercelService extends HttpMethods {
	getExample = () => {
		const uri = `https://swapi.dev/api/people/1`;
		return this.get<any>(uri);
	};
}

export const VercelServiceInstance = new VercelService(VercelServiceConfig);
