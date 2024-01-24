import { MongoService } from '@/services/MongoDB/MongoService';
import { CacheOptions, MethodConfigT } from '@/services/HttpClient/HttpClient.types';
import { EffectBaseT } from '@/types/effect.types';

class EffectService extends MongoService {
	private endpoint: string = 'effect';

	getEffect(name: string): Promise<EffectBaseT> {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			params: { name },
			cache: CacheOptions.noStore,
		};
		return this.get<EffectBaseT>(methodConfig);
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
}

export const EffectServiceInstance = new EffectService();
