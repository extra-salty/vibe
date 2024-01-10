import { MongoService } from '@/services/MongoDB/MongoService';
import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import { MethodConfigT } from '@/services/HttpClient/HttpClient.types';

class EffectService extends MongoService {
	private endpoint: string = 'effect';

	getEffect(name: string): Promise<BaseEffectT> {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			params: { name },
		};
		return this.get<BaseEffectT>(methodConfig);
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

	updateEffect(effectData: Omit<BaseEffectT, 'dateCreated'>) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			data: effectData,
		};
		return this.patch(methodConfig);
	}
}

export const EffectServiceInstance = new EffectService();
