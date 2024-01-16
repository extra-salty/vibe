import { MongoService } from '@/services/MongoDB/MongoService';
import { MethodConfigT } from '@/services/HttpClient/HttpClient.types';
import { AnimationT } from '@/state/features/animation/animation.types';
import { UITableOptionsValueT } from '@/components/base/UITable/UITableOptions/UITableOptions';

class AnimationsService extends MongoService {
	private endpoint: string = 'animations';

	getAnimations(options?: UITableOptionsValueT): Promise<AnimationT[]> {
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
