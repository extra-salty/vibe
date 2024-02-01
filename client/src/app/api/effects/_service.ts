import { MongoService } from '@/services/MongoDB/MongoService';
import { CacheOptions, MethodConfigT } from '@/services/HttpClient/HttpClient.types';
import { EffectBaseT, EffectTableT } from '@/types/effect.types';

class EffectsService extends MongoService {
	private endpoint: string = 'effects';

	// getEffect(name: string): Promise<EffectBaseT> {
	// 	const methodConfig: MethodConfigT = {
	// 		endpoint: this.endpoint,
	// 		params: { name },
	// 		cache: CacheOptions.noStore,
	// 	};
	// 	return this.get<EffectBaseT>(methodConfig);
	// }

	getEffects(): Promise<EffectTableT[]> {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			cache: CacheOptions.noStore,
		};
		return this.get<EffectTableT[]>(methodConfig);
	}

	createEffect() {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
		};
		return this.put(methodConfig);
	}

	duplicateEffect(name: string) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			params: { name },
		};
		return this.post(methodConfig);
	}

	updateEffect(effectData: Omit<EffectBaseT, 'dateCreated'>) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			data: effectData,
		};
		return this.patch(methodConfig);
	}

	deleteEffects(effects: string[]) {
		console.log('🚀 ~ EffectsService ~ deleteEffects ~ effects:', effects);
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			data: effects,
		};
		return this.delete(methodConfig);
	}
}

export const EffectsServiceInstance = new EffectsService();
