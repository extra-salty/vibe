import { MongoService } from '@/services/mongodb/MongoService';
import { CacheOptions, MethodConfigT } from '@/services/HttpClient/HttpClient.types';
import { StaticAnimationT } from '@/types/animation.types';

class StaticAnimationsService extends MongoService {
	private endpoint: string = 'staticAnimations';

	getAnimations(): Promise<StaticAnimationT[]> {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			cache: CacheOptions.noStore,
		};
		return this.get<StaticAnimationT[]>(methodConfig);
	}

	deleteAnimations(ids: string[]) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			params: { ids: encodeURIComponent(ids.join('&')) },
		};
		return this.delete(methodConfig);
	}
}

export const StaticAnimationsApi = new StaticAnimationsService();
