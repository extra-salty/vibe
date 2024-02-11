import { CacheOptions, ContentType, MethodConfigT } from '@/services/HttpClient/HttpClient.types';
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

	validateEffectName(name: string): Promise<{ exist: boolean }> {
		const methodConfig: MethodConfigT = {
			endpoint: `${this.endpoint}/name`,
			params: { name },
			// cache: CacheOptions.noCache,
		};
		return this.get<{ exist: boolean }>(methodConfig);
	}

	createEffect(effect: { duplicateId?: string; data: FormData }) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			...(effect.duplicateId && { params: { duplicateId: effect.duplicateId } }),
			body: effect.data,
			type: ContentType.FormData,
		};
		return this.post(methodConfig);
	}

	updateEffect(effectData: Omit<EffectBaseT, 'dateCreated'>) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			body: effectData,
		};
		return this.patch(methodConfig);
	}

	deleteEffect(effects: string) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			body: effects,
		};
		return this.delete(methodConfig);
	}
}

export const EffectServiceInstance = new EffectService();
