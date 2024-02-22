import { MongoService } from '@/services/mongodb/MongoService';
import { ContentType, MethodConfigT } from '@/services/HttpClient/HttpClient.types';
import { AnimationT } from '@/types/animation.types';

class AnimationGroupService extends MongoService {
	private endpoint: string = 'animationGroup';

	getAnimationGroup(id: string): Promise<AnimationT> {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			params: { id },
		};
		return this.get<AnimationT>(methodConfig);
	}

	validateAnimationGroupName(name: string): Promise<{ exist: boolean }> {
		const methodConfig: MethodConfigT = {
			endpoint: `${this.endpoint}/name`,
			params: { name },
			// cache: CacheOptions.noCache,
		};
		return this.get<{ exist: boolean }>(methodConfig);
	}

	createAnimationGroup(animation: { duplicateId?: string; data: FormData }) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			...(animation.duplicateId && { params: { duplicateId: animation.duplicateId } }),
			body: animation.data,
			type: ContentType.FormData,
		};
		return this.post(methodConfig);
	}

	updateAnimationGroup(animationData: AnimationT) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			body: animationData,
		};
		return this.patch(methodConfig);
	}
}

export const AnimationServiceInstance = new AnimationGroupService();
