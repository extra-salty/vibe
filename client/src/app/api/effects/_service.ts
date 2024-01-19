import { MongoService } from '@/services/MongoDB/MongoService';
import { CacheOptions, MethodConfigT } from '@/services/HttpClient/HttpClient.types';
import { UITableOptionsValueT } from '@/components/base/UITable/UITableOptions/UITableOptions';
import { EffectBaseT } from '@/types/effect.types';

class EffectsService extends MongoService {
	private endpoint: string = 'effects';

	getEffects(options?: UITableOptionsValueT): Promise<EffectBaseT[]> {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			params: options,
			cache: CacheOptions.noStore,
		};
		return this.get<EffectBaseT[]>(methodConfig);
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
