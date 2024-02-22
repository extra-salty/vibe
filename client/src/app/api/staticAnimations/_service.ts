import { MongoService } from '@/services/mongodb/MongoService';
import { CacheOptions, MethodConfigT } from '@/services/HttpClient/HttpClient.types';
import { StaticAnimationTableT } from '@/types/staticAnimation.types';

class StaticAnimationsService extends MongoService {
	private endpoint: string = 'staticAnimations';

	getStaticAnimations(): Promise<StaticAnimationTableT[]> {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			cache: CacheOptions.noStore,
		};
		return this.get<StaticAnimationTableT[]>(methodConfig);
	}

	deleteStaticAnimations(effects: string[]) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			body: effects,
		};
		return this.delete(methodConfig);
	}
}

export const StaticAnimationsServiceInstance = new StaticAnimationsService();
