import { MongoService } from '@/services/MongoDB/MongoService';
import { MethodConfigT } from '@/services/HttpClient/HttpClient.types';
import { ColorT } from '@/state/features/effect/effectSlice.types';

class EffectsDataService extends MongoService {
	private endpoint: string = 'effectsData';

	getEffectsData(names: string[][]): Promise<ColorT[][]> {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			data: names,
		};
		return this.post<ColorT[][]>(methodConfig);
	}
}

export const EffectsDataServiceInstance = new EffectsDataService();
