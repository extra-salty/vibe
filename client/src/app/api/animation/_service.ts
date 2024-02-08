import { MongoService } from '@/services/mongodb/MongoService';
import { MethodConfigT } from '@/services/HttpClient/HttpClient.types';
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

	validateAnimationName(name: string): Promise<boolean> {
		const methodConfig: MethodConfigT = {
			endpoint: `${this.endpoint}/name`,
			params: { name },
			// cache: CacheOptions.noCache,
		};
		return this.head<boolean>(methodConfig);
	}

	createAnimation(animationToDuplicate?: string) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			...(!!animationToDuplicate && { params: { animationToDuplicate } }),
		};
		return this.post(methodConfig);
	}

	updateAnimation(animationData: AnimationBaseT) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			data: animationData,
		};
		return this.patch(methodConfig);
	}
}

export const AnimationServiceInstance = new AnimationService();
