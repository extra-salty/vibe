import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import { HttpService } from '../HttpClient/HttpClient';
import { MethodConfigT } from '../HttpClient/HttpClient.types';
import { EffectDataOptionsT, EffectDataUpdateT } from './vibeService.types';

const baseUri = process.env.NEXT_PUBLIC_BASE_API_URL;
const config: Record<string, any> = {};

class VibeService extends HttpService {
	getStaticEffects(options: EffectDataOptionsT): Promise<BaseEffectT[]> {
		const methodConfig: MethodConfigT = {
			endpoint: 'staticEffects',
			params: options,
		};
		return this.get<BaseEffectT[]>(methodConfig);
	}

	createStaticEffect(effect: BaseEffectT) {
		const methodConfig: MethodConfigT = {
			endpoint: 'staticEffects',
			data: effect,
		};
		return this.post(methodConfig);
	}

	updateStaticEffect(effectData: EffectDataUpdateT) {
		const methodConfig: MethodConfigT = {
			endpoint: 'staticEffects',
			data: effectData,
		};
		return this.put(methodConfig);
	}

	deleteStaticEffects(selectedStaticEffects: string[]) {
		const methodConfig: MethodConfigT = {
			endpoint: 'staticEffects',
			data: selectedStaticEffects,
		};
		return this.delete(methodConfig);
	}
}

export const VibeServiceInstance = new VibeService(baseUri, config);
