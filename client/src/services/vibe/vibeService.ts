import { HttpService } from '../HttpClient/HttpClient';
import { MethodConfigT } from '../HttpClient/HttpClient.types';
import { EffectDataOptionsT, EffectDataUpdateT } from './vibeService.types';
import { BaseEffectT } from '@/state/features/effect/effectSlice.types';
import { AnimationT } from '@/state/features/animation/animation.types';

const baseUri = process.env.NEXT_PUBLIC_BASE_API_URL;
const config: Record<string, any> = {};

class VibeService extends HttpService {
	// Static Effects
	getStaticEffect(_id: string): Promise<BaseEffectT> {
		const methodConfig: MethodConfigT = {
			endpoint: 'staticEffect',
			params: { _id },
		};
		return this.get<BaseEffectT>(methodConfig);
	}

	getStaticEffects(options?: EffectDataOptionsT): Promise<BaseEffectT[]> {
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

	// Animations
	getAnimation(name: string): Promise<AnimationT> {
		const methodConfig: MethodConfigT = {
			endpoint: 'animation',
			params: { name },
		};
		return this.get<AnimationT>(methodConfig);
	}

	getAnimations(): Promise<AnimationT[]> {
		const methodConfig: MethodConfigT = {
			endpoint: 'animations',
		};
		return this.get<AnimationT[]>(methodConfig);
	}

	createAnimation(effect: BaseEffectT) {
		const methodConfig: MethodConfigT = {
			endpoint: 'staticEffects',
			data: effect,
		};
		return this.post(methodConfig);
	}
}

export const VibeServiceInstance = new VibeService(baseUri, config);
