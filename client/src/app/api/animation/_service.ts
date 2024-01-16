import { MongoService } from '@/services/MongoDB/MongoService';
import { MethodConfigT } from '@/services/HttpClient/HttpClient.types';
import { BaseAnimationT } from './_types';

class AnimationService extends MongoService {
	private endpoint: string = 'animation';

	getAnimation(name: string): Promise<BaseAnimationT> {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			params: { name },
		};
		return this.get<BaseAnimationT>(methodConfig);
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

	updateAnimation(animationData: BaseAnimationT) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			data: animationData,
		};
		return this.patch(methodConfig);
	}
}

export const AnimationServiceInstance = new AnimationService();
