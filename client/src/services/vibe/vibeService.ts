import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import { HttpService } from '../HttpClient/HttpClient';
import { MethodConfigT } from '../HttpClient/HttpClient.types';

const baseUri = process.env.NEXT_PUBLIC_BASE_API_URL;
const config: Record<string, any> = {};

class VibeService extends HttpService {
	getStaticEffectsData(): Promise<any> {
		const methodConfig: Omit<MethodConfigT, 'data'> = {
			endpoint: 'getStaticEffects',
		};
		return this.get<any>(methodConfig);
	}

	createStaticEffect(effect: BaseEffectT) {
		const methodConfig: MethodConfigT = {
			endpoint: 'postStaticEffect',
			data: effect,
		};
		return this.post(methodConfig);
	}

	deleteStaticEffects(selectedStaticEffects: string[]) {
		const methodConfig: MethodConfigT = {
			endpoint: 'deleteStaticEffects',
			data: selectedStaticEffects,
		};
		return this.delete(methodConfig);
	}
}

export const VibeServiceInstance = new VibeService(baseUri, config);
