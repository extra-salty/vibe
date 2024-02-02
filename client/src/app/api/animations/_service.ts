import { MongoService } from '@/services/mongodb/MongoService';
import { CacheOptions, MethodConfigT } from '@/services/HttpClient/HttpClient.types';
import { AnimationBaseT } from '@/types/animation.types';

class AnimationsService extends MongoService {
	private endpoint: string = 'animations';

	getAnimations(): Promise<AnimationBaseT[]> {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			cache: CacheOptions.noCache,
		};
		return this.get<AnimationBaseT[]>(methodConfig);
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
