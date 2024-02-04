import { CacheOptions, MethodConfigT } from '@/services/HttpClient/HttpClient.types';
import { MongoService } from '@/services/mongodb/MongoService';
import { EffectBaseT, EffectStateT } from '@/types/effect.types';

class EffectService extends MongoService {
	private endpoint: string = 'effect';

	getEffectDetails(name: string): Promise<EffectStateT> {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			params: { name },
			cache: CacheOptions.noStore,
		};
		return this.get<EffectStateT>(methodConfig);
	}

	createEffect(duplicate?: string) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
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

	deleteEffect(effects: string) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			data: effects,
		};
		return this.delete(methodConfig);
	}
}

export const EffectServiceInstance = new EffectService();