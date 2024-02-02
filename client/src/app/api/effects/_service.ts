import { MongoService } from '@/services/mongodb/MongoService';
import { CacheOptions, MethodConfigT } from '@/services/HttpClient/HttpClient.types';
import { EffectTableT } from '@/types/effect.types';

class EffectsService extends MongoService {
	private endpoint: string = 'effects';

	getEffects(): Promise<EffectTableT[]> {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			cache: CacheOptions.noStore,
		};
		return this.get<EffectTableT[]>(methodConfig);
	}

	deleteEffects(effects: string[]) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			data: effects,
		};
		return this.delete(methodConfig);
	}
}

export const EffectsServiceInstance = new EffectsService();
