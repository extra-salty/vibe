import { MongoService } from '@/services/MongoDB/MongoService';
import { MethodConfigT } from '@/services/HttpClient/HttpClient.types';
import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import { UITableOptionsValueT } from '@/components/base/UITable/UITableOptions/UITableOptions';

class EffectsService extends MongoService {
	private endpoint: string = 'effects';

	getEffects(options?: UITableOptionsValueT): Promise<BaseEffectT[]> {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			params: options,
		};
		return this.get<BaseEffectT[]>(methodConfig);
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
