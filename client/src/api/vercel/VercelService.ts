import { HttpMethods } from '../HttpMethods';

const VercelServiceConfig = {
	baseURL: 'https://geodb-cities-graphql.p.rapidapi.com',
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