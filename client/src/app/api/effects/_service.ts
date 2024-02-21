import { MongoService } from '@/services/mongodb/MongoService';
import { CacheOptions, MethodConfigT } from '@/services/HttpClient/HttpClient.types';
import { StaticAnimationTableT } from '@/types/effect.types';

class EffectsService extends MongoService {
	private endpoint: string = 'effects';

	getEffects(): Promise<StaticAnimationTableT[]> {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			cache: CacheOptions.noStore,
		};
		return this.get<StaticAnimationTableT[]>(methodConfig);
	}

	deleteEffects(effects: string[]) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			body: effects,
		};
		return this.delete(methodConfig);
	}
}

export const EffectsServiceInstance = new EffectsService();
