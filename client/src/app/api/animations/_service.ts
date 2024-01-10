import { MethodConfigT } from '@/services/HttpClient/HttpClient.types';
import { MongoService, SortAndFilterOptionsT } from '@/services/MongoDB/MongoService';
import { AnimationT } from '@/state/features/animation/animation.types';

class AnimationsService extends MongoService {
	private endpoint: string = 'animations';

	getAnimations(options?: SortAndFilterOptionsT): Promise<AnimationT[]> {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			params: options,
		};
		return this.get<AnimationT[]>(methodConfig);
	}

	deleteAnimations(animations: string[]) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			data: animations,
		};
		return this.delete(methodConfig);
	}
}

export const AnimationsServiceInstance = new AnimationsService();
