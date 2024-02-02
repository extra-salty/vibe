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

	createAnimation() {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
		};
		return this.put(methodConfig);
	}

	duplicateAnimation(name: string) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			params: { name },
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
