import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import { MethodConfigT } from '@/services/HttpClient/HttpClient.types';
import { MongoService, SortAndFilterOptionsT } from '@/services/MongoDB/MongoService';

class EffectsService extends MongoService {
	private endpoint: string = 'effects';

	getEffects(options?: SortAndFilterOptionsT): Promise<BaseEffectT[]> {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			params: options,
		};
		return this.get<BaseEffectT[]>(methodConfig);
	}

	deleteEffects(selectedStaticEffects: string[]) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			data: selectedStaticEffects,
		};
		return this.delete(methodConfig);
	}
}

export const EffectsServiceInstance = new EffectsService();
