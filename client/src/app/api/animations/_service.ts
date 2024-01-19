import { MongoService } from '@/services/MongoDB/MongoService';
import { CacheOptions, MethodConfigT } from '@/services/HttpClient/HttpClient.types';
import { UITableOptionsValueT } from '@/components/base/UITable/UITableOptions/UITableOptions';
import { BaseAnimationT } from '@/state/features/animation/animation.types';

class AnimationsService extends MongoService {
	private endpoint: string = 'animations';

	getAnimations(options?: UITableOptionsValueT): Promise<BaseAnimationT[]> {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			params: options,
			cache: CacheOptions.noCache,
		};
		return this.get<BaseAnimationT[]>(methodConfig);
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
