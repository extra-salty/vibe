import { MongoService } from '@/services/mongodb/MongoService';
import { ContentType, MethodConfigT } from '@/services/HttpClient/HttpClient.types';
import { AnimationBaseT, AnimationStateT } from '@/types/animation.types';

class AnimationService extends MongoService {
	private endpoint: string = 'animation';

	getAnimation(name: string): Promise<AnimationStateT> {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			params: { name },
		};
		return this.get<AnimationStateT>(methodConfig);
	}

	validateAnimationName(name: string): Promise<{ exist: boolean }> {
		const methodConfig: MethodConfigT = {
			endpoint: `${this.endpoint}/name`,
			params: { name },
			// cache: CacheOptions.noCache,
		};
		return this.get<{ exist: boolean }>(methodConfig);
	}

	createAnimation(animation: { duplicateId?: string; data: FormData }) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			...(animation.duplicateId && { params: { duplicateId: animation.duplicateId } }),
			body: animation.data,
			type: ContentType.FormData,
		};
		return this.post(methodConfig);
	}

	updateAnimation(animationData: AnimationBaseT) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			body: animationData,
		};
		return this.patch(methodConfig);
	}
}

export const AnimationServiceInstance = new AnimationService();
