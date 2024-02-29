import { MongoService } from '@/services/mongodb/MongoService';
import { ContentType, MethodConfigT } from '@/services/HttpClient/HttpClient.types';
import { AnimationT, StaticAnimationT } from '@/types/animation.types';

class StaticAnimationService extends MongoService {
	private endpoint: string = 'staticAnimation';

	load(ids: string[]): Promise<StaticAnimationT> {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			params: { ids: encodeURIComponent(ids.join('&')) },
		};
		return this.get<StaticAnimationT>(methodConfig);
	}

	validateName(name: string) {
		const methodConfig: MethodConfigT = {
			endpoint: `${this.endpoint}/name`,
			params: { name },
			// cache: CacheOptions.noCache,
		};
		return this.get(methodConfig);
	}

	create(animation: { duplicateId?: string; data: FormData }) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			...(animation.duplicateId && { params: { duplicateId: animation.duplicateId } }),
			body: animation.data,
			type: ContentType.FormData,
		};
		return this.post(methodConfig);
	}

	update(animationData: AnimationT) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			body: animationData,
		};
		return this.patch(methodConfig);
	}
}

export const StaticAnimationApi = new StaticAnimationService();
